var express = require('express');
const AdmZip = require('adm-zip');
const Jimp = require('jimp');
const pathModule = require('path');
const fs = require('fs-extra');
const uuid = require('uuid').v4;
var router = express.Router();

var TEMP_DOWNLOADS = {};

function path(file) {
	return pathModule.join(__dirname, file);
}

router.get('/', function(req, res, next) {
  res.render('totem');
});

router.get('/make/:username/:version', (req, res, _next) => {
  let username = req.params.username;
  let packVersion = parseInt(req.params.version);
  
  let mcmeta = {pack: {'pack_format': packVersion,'description': `§6§k$§r §6${username} 3D totem §k$§r\n§6toxicaven.dev/totem§r`}};
  let readmeText = "Generated using https://toxicaven.dev/totem\nOriginal resources by _Smokescreen_\nBorrowed some backend code from tycrek (https://jmoore.dev/custom-totem)\nIcon and Skin downloaded from https://minotar.net";
  let totemJson = {"parent": "item/skin","textures": {"layer0": "items/totem"}};
  let skinJson = {"texture_size":[64,64],"textures":{"0":"items/totem"},"elements":[{"from":[-4,24,-4],"to":[4,32,4],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[2,2,4,4],"texture":"#0"},"east":{"uv":[0,2,2,4],"texture":"#0"},"south":{"uv":[6,2,8,4],"texture":"#0"},"west":{"uv":[4,2,6,4],"texture":"#0"},"up":{"uv":[4,2,2,0],"texture":"#0"},"down":{"uv":[6,0,4,2],"texture":"#0"}}},{"from":[-4.5,23,-4.5],"to":[4.5,32,4.5],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[10,2,12,4],"texture":"#0"},"east":{"uv":[8,2,10,4],"texture":"#0"},"south":{"uv":[14,2,16,4],"texture":"#0"},"west":{"uv":[12,2,14,4],"texture":"#0"},"up":{"uv":[12,2,10,0],"texture":"#0"},"down":{"uv":[14,0,12,2],"texture":"#0"}}},{"from":[-4,12,-2],"to":[4,24,2],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[5,5,7,8],"texture":"#0"},"east":{"uv":[4,5,5,8],"texture":"#0"},"south":{"uv":[8,5,10,8],"texture":"#0"},"west":{"uv":[7,5,8,8],"texture":"#0"},"up":{"uv":[7,5,5,4],"texture":"#0"},"down":{"uv":[9,4,7,5],"texture":"#0"}}},{"from":[-4.25,11.75,-2.25],"to":[4.25,24.25,2.25],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[5,9,7,12],"texture":"#0"},"east":{"uv":[4,9,5,12],"texture":"#0"},"south":{"uv":[8,9,10,12],"texture":"#0"},"west":{"uv":[7,9,8,12],"texture":"#0"},"up":{"uv":[7,9,5,8],"texture":"#0"},"down":{"uv":[9,8,7,9],"texture":"#0"}}},{"from":[4,12,-2],"to":[8,24,2],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[11,5,12,8],"texture":"#0"},"east":{"uv":[10,5,11,8],"texture":"#0"},"south":{"uv":[13,5,14,8],"texture":"#0"},"west":{"uv":[12,5,13,8],"texture":"#0"},"up":{"uv":[12,5,11,4],"texture":"#0"},"down":{"uv":[13,4,12,5],"texture":"#0"}}},{"from":[3.75,11.75,-2.25],"to":[8.25,24.25,2.25],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[11,9,12,12],"texture":"#0"},"east":{"uv":[10,9,11,12],"texture":"#0"},"south":{"uv":[13,9,14,12],"texture":"#0"},"west":{"uv":[12,9,13,12],"texture":"#0"},"up":{"uv":[12,9,11,8],"texture":"#0"},"down":{"uv":[13,8,12,9],"texture":"#0"}}},{"from":[-8,12,-2],"to":[-4,24,2],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[9,13,10,16],"texture":"#0"},"east":{"uv":[8,13,9,16],"texture":"#0"},"south":{"uv":[11,13,12,16],"texture":"#0"},"west":{"uv":[10,13,11,16],"texture":"#0"},"up":{"uv":[10,13,9,12],"texture":"#0"},"down":{"uv":[11,12,10,13],"texture":"#0"}}},{"from":[-8.25,11.75,-2.25],"to":[-3.75,24.25,2.25],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[13,13,14,16],"texture":"#0"},"east":{"uv":[12,13,13,16],"texture":"#0"},"south":{"uv":[15,13,16,16],"texture":"#0"},"west":{"uv":[14,13,15,16],"texture":"#0"},"up":{"uv":[14,13,13,12],"texture":"#0"},"down":{"uv":[15,12,14,13],"texture":"#0"}}},{"from":[-0.1,0,-2],"to":[3.9,12,2],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[1,5,2,8],"texture":"#0"},"east":{"uv":[0,5,1,8],"texture":"#0"},"south":{"uv":[3,5,4,8],"texture":"#0"},"west":{"uv":[2,5,3,8],"texture":"#0"},"up":{"uv":[2,5,1,4],"texture":"#0"},"down":{"uv":[3,4,2,5],"texture":"#0"}}},{"from":[-0.35,-0.25,-2.25],"to":[4.15,12.25,2.25],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[1,9,2,12],"texture":"#0"},"east":{"uv":[0,9,1,12],"texture":"#0"},"south":{"uv":[3,9,4,12],"texture":"#0"},"west":{"uv":[2,9,3,12],"texture":"#0"},"up":{"uv":[2,9,1,8],"texture":"#0"},"down":{"uv":[3,8,2,9],"texture":"#0"}}},{"from":[-3.9,0,-2],"to":[0.1,12,2],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[5,13,6,16],"texture":"#0"},"east":{"uv":[4,13,5,16],"texture":"#0"},"south":{"uv":[7,13,8,16],"texture":"#0"},"west":{"uv":[6,13,7,16],"texture":"#0"},"up":{"uv":[6,13,5,12],"texture":"#0"},"down":{"uv":[7,12,6,13],"texture":"#0"}}},{"from":[-4.15,-0.25,-2.25],"to":[0.35,12.25,2.25],"rotation":{"angle":0,"axis":"y","origin":[0,0,0]},"faces":{"north":{"uv":[1,13,2,16],"texture":"#0"},"east":{"uv":[0,13,1,16],"texture":"#0"},"south":{"uv":[3,13,4,16],"texture":"#0"},"west":{"uv":[2,13,3,16],"texture":"#0"},"up":{"uv":[2,13,1,12],"texture":"#0"},"down":{"uv":[3,12,2,13],"texture":"#0"}}}],"display":{"thirdperson_righthand":{"rotation":[0,90,0],"translation":[2.5,-0.5,0.5],"scale":[0.3,0.3,0.3]},"thirdperson_lefthand":{"rotation":[0,90,0],"translation":[2.5,-0.5,5],"scale":[0.3,0.3,0.3]},"firstperson_righthand":{"rotation":[-20,90,0],"translation":[-0.75,2.9,3.75],"scale":[0.2,0.2,0.2]},"firstperson_lefthand":{"rotation":[-20,90,0],"translation":[-0.75,4,6.75],"scale":[0.2,0.2,0.2]},"ground":{"translation":[3,2.75,2.5],"scale":[0.4,0.4,0.4]},"gui":{"rotation":[0,-180,0],"translation":[-4,-3.75,0],"scale":[0.45,0.45,0.45]},"head":{"translation":[11.5,-4,3],"scale":[0.3,0.3,0.3]},"fixed":{"translation":[3.25,-3.5,0],"scale":[0.4,0.4,0.4]}},"groups":[{"name":"Head","origin":[0,24,0],"children":[0,1]},{"name":"Body","origin":[0,24,0],"children":[2,3]},{"name":"RightArm","origin":[5,22,0],"children":[4,5]},{"name":"LeftArm","origin":[-5,22,0],"children":[6,7]},{"name":"RightLeg","origin":[1.9,12,0],"children":[8,9]},{"name":"LeftLeg","origin":[-1.9,12,0],"children":[10,11]}]};

  let zip = new AdmZip();
  let uid = uuid().split('-')[0];
  let base = `../public/files/${username}-3d-totem`;

  let basePath = path(base);
  let archivePath = path(`${base}.zip`);
  let mcmetaPath = path(`${base}/pack.mcmeta`);
  let readmePath = path(`${base}/README.txt`);
  let pngPath = path(`${base}/pack.png`);
  let skinPath = path(`${base}/assets/minecraft/textures/items/totem.png`);
  let skinJsonPath = path(`${base}/assets/minecraft/models/item/skin.json`);
  let totemJsonPath = path(`${base}/assets/minecraft/models/item/totem.json`);

  if (packVersion != 3) {
      totemJsonPath = path(`${base}/assets/minecraft/models/item/totem_of_undying.json`);   
  } else {
      totemJsonPath = path(`${base}/assets/minecraft/models/item/totem.json`);
  }

  fs.mkdir(basePath)
      .then(() => new Promise((resolve, reject) =>
          Jimp.read(`https://minotar.net/helm/${username}/128.png`)
              .then((image) => image.writeAsync(pngPath))
              .then(() => resolve())
              .catch((err) => reject(err))
      ))
      .then(() => new Promise((resolve, reject) =>
      Jimp.read(`https://minotar.net/skin/${username}`)
        .then((image) => image.writeAsync(skinPath))
        .then(() => resolve())
        .catch((err) => reject(err))
    ))
      .then(() => fs.writeJson(mcmetaPath, mcmeta))
      .then(() => fs.outputJson(totemJsonPath, totemJson))
      .then(() => fs.writeJson(skinJsonPath, skinJson))
      .then(() => fs.writeFile(readmePath, readmeText))
      .then(() => zip.addLocalFolder(basePath))
      .then(() => zip.writeZip(archivePath))
      .then(() => TEMP_DOWNLOADS[uid] = archivePath)
      .then(() => res.type('json').send({ success: true, message: uid }))
      .then(() => fs.remove(basePath))
      .catch((err) => {
          console.log(err)
    });
});

router.get('/download/:did', (req, res, _next) => {
	res.download(TEMP_DOWNLOADS[req.params.did], (err) => {
		err != null && log.warn(err);
		if (res.headersSent) fs.remove(TEMP_DOWNLOADS[req.params.did]);
	});
});

module.exports = router;