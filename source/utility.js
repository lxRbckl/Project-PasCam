// import <
const {

    rm,
    mkdir,
    readdir,
    readFile,
    writeFile

} = require('fs/promises');

// >


// declare <
const gSpacing = 4;
const gDataPath = '/data/';
const gProjectPath = process.cwd();

// >


async function setFile(

    pFile,
    pData,
    pEnding = '.json'

) {
    
    try {

        await writeFile(
            
            gProjectPath + gDataPath + pFile + pEnding, 
            JSON.stringify(pData, null, gSpacing)
            
        );

        return true;

    } catch (error) {return false;}

}


async function getFile(
    
    pFile,
    pEnding = '.json'

) {

    try {

        const file = await readFile(gProjectPath + gDataPath + pFile + pEnding);
        return JSON.parse(file.toString());

    } catch (error) {return false;}

}


async function delFile(

    pFile,
    pEnding = '.json'

) {

    try {

        await rm(gProjectPath + gDataPath + pFile + pEnding);
        return true;

    } catch (error) {return false;}

}


async function setDirectory(pDirectory) {

    try {

        if (!(await getDirectory(pDirectory = pDirectory))) {

            await mkdir(gProjectPath + gDataPath + pDirectory);
            return true;

        } else {return false;}

    } catch (error) {return false;}

}


async function getDirectory(pDirectory = '') {

    try {return await readdir(gProjectPath + gDataPath + pDirectory);}
    catch (error) {return false;}

}


async function delDirectory(pDirectory) {

    try {

        await rm(
            
            gProjectPath + gDataPath + pDirectory, 
            {recursive : true}
            
        );

        return true;

    } catch (error) {return false;}

}


// export <
module.exports = {

    gSpacing,
    gDataPath,

    setFile,
    getFile,
    delFile,
    setDirectory,
    getDirectory,
    delDirectory

};

// >