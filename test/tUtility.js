// import <
const assert = require('assert');
const {

    setFile,
    getFile,
    delFile,
    setDirectory,
    getDirectory,
    delDirectory

} = require('../source/utility.js')

// >


describe('setFile() Test Suite', async () => {

    it('can create valid file', async () => {

        const result = await setFile(
        
            pFile = 'test1',
            pData = {'test' : 'test'}
            
        );

        assert.strictEqual(result, true);

    });
    it('can detect invalid path', async () => {

        const result = await setFile(

            pFile = 'examine/test2',
            pData = {'test' : 'test'}

        );

        assert.strictEqual(result, false);

    });

});


describe('getFile() Test Suite', async () => {

    it('can load data from file', async () => {

        const data = {test : 'test'};
        const result = await getFile(pFile = 'test1');

        assert.deepStrictEqual(result, data);

    });
    it('can detect invalid path', async () => {

        const result = await getFile(pFile = 'test');

        assert.strictEqual(result, false);

    });

});


describe('delFile() Test Suite', async () => {

    it('can delete new file', async () => {

        const result = await delFile(pFile = 'test1');

        assert.strictEqual(result, true);

    });
    it('can detect non-existing files', async () => {

        const result = await delFile(pFile = 'test1');

        assert.strictEqual(result, false);

    });

})


describe('setDirectory() Test Suite', async () => {

    it('can create new directory', async () => {

        const result = await setDirectory(pDirectory = 'test1');

        assert.strictEqual(result, true);

    });
    it('can detect existing directory', async () => {

        const result = await setDirectory(pDirectory = 'test1');

        assert.strictEqual(result, false);

    });

});


describe('getDirectory() Test Suite', async () => {

    it('can retrieve existing directory', async () => {

        const result = await getDirectory(pDirectory = 'test1');

        assert.deepStrictEqual(result, []);

    });
    it('can detect non-existing directory', async () => {

        const result = await getDirectory(pDirectory = 'test');

        assert.strictEqual(result, false);

    });

});


describe('delDirectory() Test Suite', async () => {

    it('can delete existing directory', async () => {

        const result = await delDirectory(pDirectory = 'test1');

        assert.strictEqual(result, true);

    });
    it('can detect non-existing directory', async () => {

        const result = await delDirectory(pDirectory = 'test1');

        assert.strictEqual(result, false);

    });

});