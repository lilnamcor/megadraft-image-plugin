/***
 * Helper functions to interact with IPFS
 * @geoffmall
 */

import secureRandom from 'secure-random';
import Helpers from './helpers';

const HOST = window.location.host.includes('localhost') ? 'http://localhost:8080' : window.location.host.includes('quantfive') ? 'https://testnet.lunyr.com/golang' : '';

function IPFSFetch(ipfsHash) {
  fetch('https://ipfs.io/ipfs/' + ipfsHash)
  .then(Helpers.checkStatus)
  .catch((error) => {
    // TODO: error handling here
  })
  return fetch(HOST + '/ipfs-fetch/' + ipfsHash, {method: 'post', body: JSON.stringify(null), headers: { 'Content-Type': 'application/json'}})
  .then(Helpers.checkStatus)
  .then((json) => {
    return json;
  })
  .catch((error) => {
    // TODO: error handling here
  })
}

/**
 * Uploads the file to IPFS
 * @param [files] -- the list of files (either image or video) as File objects
 * @param str type -- the type of the file, a string currently either 'image' or 'video'
 */
export function uploadFiles(files, node) {
  return ipfsDragDropUpload(files, node).then((files) => {
    return IPFSFetch(files[0].hash)
    .then((_) => {
      return files;
    })
  });
}

/***
 * Gets files from IPFS
 * @param [multihashes] -- an array of multihash objects. most likely it's just one right now
 * @param node -- the IPFS node
 */
export function getFiles(multihash, node, index) {
  var files = []
  return ipfsGetFileByHash(multihash, node)
    .then((file) => {
      // i think files will be an array of objects with fields
      // path and content
      // if (files.length > 0)
      //   return files[0].content;
      if (file.length > 0)
        files.push(file[0].content);

      if (!index)
        return Promise.resolve(files);
      else
        return Promise.resolve([files[0], index]);

    })
    .catch((error) => {
      // TODO: error handling here
      console.log(error);
      return Promise.reject(error);
    })
}

/**
 * TODO: currently only returns one file, make return all
 * Uploads the file to IPFS
 * @param [files] -- the list of files (either image or video) as File objects
 * @param str type -- the type of the file, a string currently either 'image' or 'video'
 */
export function ipfsDragDropUpload(files, node) {

    // return type ArrayBuffer from type File input
    function readFileContents(file) {
        return new Promise((resolve) => {
            const reader = new window.FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsArrayBuffer(file);
        });
    }

    let filesArray = [];
    for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
    }

    filesArray.map((file) => {
        if (typeof file === 'string') {
            return null
        } else {
            file.title = '';
            file.captions = '';
            file.src = file.preview;
        }
        return file
    });

    let returnFiles = [];

    return new Promise((resolve) => {
        filesArray
        .map((file) => {
            if (typeof file.name === 'string') {
                return readFileContents(file)
                .then((buffer) => {
                    return node.files.add([{
                        path: file.name,
                        content: new node.types.Buffer(buffer)
                    }])
                    .then((files) => {
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

                var path = '' + secureRandom(32); //random path for the hash so there is no collisions.
                return node.files.add([{
                    path: path,
                    content: new node.types.Buffer(bufferedFile)
                }])
                .then((files) => {
                    returnFiles.push(files);
                    //resolve(returnFiles);
                    resolve(files);
                });
            }
        });
    });
    // return filesArray[0].hash;
}

function createFileBlob (data, multihash) {
    const file = new window.Blob(data, {type: 'application/octet-binary'});
    const fileUrl = window.URL.createObjectURL(file);
    return fileUrl;
}

export function ipfsGetFileByHash(multihash, node) {

    return new Promise((resolve) => {
        let goodFiles = [];
        node.files.get(multihash, (err, filesStream) => {
            if(err) {throw err}

            filesStream.on('data', (file) => {
                if (file.content) {
                    const buf = [];
                    // buffer up all the data in the file
                    file.content.on('data', (data) => buf.push(data));

                    file.content.once('end', () => {
                        const listItem = createFileBlob(buf, multihash);
                        goodFiles.push({content: listItem});
                    });

                    file.content.resume()
                }
            });
            filesStream.resume();

            filesStream.on('end', () => {
                resolve(goodFiles);
                // console.log('Every file was fetched for', multihash)
            })
        })
    })
}

