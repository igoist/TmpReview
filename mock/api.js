export default {
  'POST /api/login': (req, res) => {
    let result;
    const { password } = req.body;

    console.log('mock post: ', req.body);
    if (password === '123456') {
      result = 200;
    } else {
      result = 400;
    }

    res.send({
      status: result,
    });
  },
};
