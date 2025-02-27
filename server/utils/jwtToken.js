export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        // Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
    };
    console.log(process.env.COOKIE_EXPIRE);
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };