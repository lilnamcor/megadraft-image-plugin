'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadFiles = uploadFiles;
exports.getFiles = getFiles;
exports.ipfsDragDropUpload = ipfsDragDropUpload;
exports.ipfsGetFileByHash = ipfsGetFileByHash;

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * Helper functions to interact with IPFS
 * @geoffmall
 */

var HOST = window.location.host.includes('localhost') ? 'http://localhost:8080' : window.location.host.includes('quantfive') ? 'https://testnet.lunyr.com/golang' : '';

function IPFSFetch(ipfsHash) {
    fetch('https://ipfs.io/ipfs/' + ipfsHash).then(_helpers2.default.checkStatus).catch(function (error) {
        // TODO: error handling here
    });
    return fetch(HOST + '/ipfs-fetch/' + ipfsHash, { method: 'post', body: JSON.stringify(null), headers: { 'Content-Type': 'application/json' } }).then(_helpers2.default.checkStatus).then(function (json) {
        return json;
    }).catch(function (error) {
        // TODO: error handling here
    });
}

/**
 * Uploads the file to IPFS
 * @param [files] -- the list of files (either image or video) as File objects
 * @param str type -- the type of the file, a string currently either 'image' or 'video'
 */
function uploadFiles(files, node) {
    return ipfsDragDropUpload(files, node).then(function (files) {
        return IPFSFetch(files[0].hash).then(function (_) {
            return files;
        });
    });
}

/***
 * Gets files from IPFS
 * @param [multihashes] -- an array of multihash objects. most likely it's just one right now
 * @param node -- the IPFS node
 */
function getFiles(multihash, node, index) {
    var files = [];
    return ipfsGetFileByHash(multihash, node).then(function (file) {
        // i think files will be an array of objects with fields
        // path and content
        // if (files.length > 0)
        //   return files[0].content;
        if (file.length > 0) files.push(file[0].content);

        if (!index) return Promise.resolve(files);else return Promise.resolve([files[0], index]);
    }).catch(function (error) {
        // TODO: error handling here
        console.log(error);
        return Promise.reject(error);
    });
}

/**
 * TODO: currently only returns one file, make return all
 * Uploads the file to IPFS
 * @param [files] -- the list of files (either image or video) as File objects
 * @param str type -- the type of the file, a string currently either 'image' or 'video'
 */
function ipfsDragDropUpload(files, node) {

    // return type ArrayBuffer from type File input
    function readFileContents(file) {
        return new Promise(function (resolve) {
            var reader = new window.FileReader();
            reader.onload = function (event) {
                return resolve(event.target.result);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    var filesArray = [];
    for (var i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
    }

    filesArray.map(function (file) {
        if (typeof file === 'string') {
            return null;
        } else {
            file.title = '';
            file.captions = '';
            file.src = file.preview;
        }
        return file;
    });

    var returnFiles = [];

    return new Promise(function (resolve) {
        filesArray.map(function (file) {
            if (typeof file.name === 'string') {
                return readFileContents(file).then(function (buffer) {
                    return node.files.add([{
                        path: file.name,
                        content: new node.types.Buffer(buffer)
                    }]).then(function (files) {
                        returnFiles.push(files);
                        //resolve(returnFiles);
                        resolve(files);
                        /*resolve({
                            hash: files[0].hash,
                            size: files[0].size,
                            path: files[0].path
                        }); */
                    });
                });
            } else {
                var bufferedFile = Buffer.from(file);

                var path = '' + (0, _secureRandom2.default)(32); //random path for the hash so there is no collisions.
                return node.files.add([{
                    path: path,
                    content: new node.types.Buffer(bufferedFile)
                }]).then(function (files) {
                    returnFiles.push(files);
                    //resolve(returnFiles);
                    resolve(files);
                });
            }
        });
    });
    // return filesArray[0].hash;
}

function createFileBlob(data, multihash) {
    var file = new window.Blob(data, { type: 'application/octet-binary' });
    var fileUrl = window.URL.createObjectURL(file);
    return fileUrl;
}

function ipfsGetFileByHash(multihash, node) {

    return new Promise(function (resolve) {
        var goodFiles = [];
        node.files.get(multihash, function (err, filesStream) {
            if (err) {
                throw err;
            }

            filesStream.on('data', function (file) {
                if (file.content) {
                    var buf = [];
                    // buffer up all the data in the file
                    file.content.on('data', function (data) {
                        return buf.push(data);
                    });

                    file.content.once('end', function () {
                        var listItem = createFileBlob(buf, multihash);
                        goodFiles.push({ content: listItem });
                    });

                    file.content.resume();
                }
            });
            filesStream.resume();

            filesStream.on('end', function () {
                resolve(goodFiles);
                // console.log('Every file was fetched for', multihash)
            });
        });
    });
}