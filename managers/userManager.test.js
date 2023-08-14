const jwt = require('jsonwebtoken');
const userManager = require('../managers/userManager');
const doctorModel = require('../models/doctorModel');
const profileModel = require('../models/profileModel');

jest.mock('jsonwebtoken');
jest.mock('../models/doctorModel');
jest.mock('../models/profileModel');

describe('User Manager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Token sign', () => {
    const userId = 'user123';
    const email = 'user@example.com';
    const expiresIn = '1h';
    const token = 'generatedToken';

    jwt.sign.mockReturnValue(token);

    const result = userManager.tokenSign(userId, email, expiresIn);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId, email },
      process.env.TOKEN_KEY,
      { expiresIn }
    );
    expect(result).toEqual(token);
  });

});





