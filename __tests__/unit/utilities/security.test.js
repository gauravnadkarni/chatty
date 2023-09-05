import React from 'react';
import security from '../../../src/utilities/security';
import '@testing-library/jest-dom';
 
const FAKE_KEY = "Fake_key_for_the_encryption_withj_numbers_123";
const FAKE_PASSWORD = "Password@1";

describe('Security utility test', () => {
    beforeEach(() => {

    });

    afterEach(() => {

    });


    it('expect data to be encrypted', async() => {
        const encryptedPassword = security.encrypt(FAKE_PASSWORD,FAKE_KEY);
        expect(encryptedPassword).not.toBeUndefined();
        expect(encryptedPassword).not.toBeNull();
        expect(encryptedPassword.length).toBeGreaterThanOrEqual(8);
    })

    it('expect encrypted data to match the same data when decrypted', async() => {
        const encryptedPassword = security.encrypt(FAKE_PASSWORD,FAKE_KEY);
        const decryptedPassword = security.decrypt(encryptedPassword,FAKE_KEY);
        expect(decryptedPassword).toMatch(FAKE_PASSWORD);
    })
})