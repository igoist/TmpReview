var cardMock = {
  id: 0,
  title: '作品标题作品标题',
  works: [
    {
      cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
      des: '描述描述描述描述描述描述描述描述描述描述描述描述',
    },
    {
      cover: '//hbfile.huabanimg.com/1b8e4986034aec8113b862e99a26ff8854b8979f',
      des: '描述描述描述描述描述描述描述描述描述描述描述描述',
    },
  ],
  avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  username: '用户名',
  evaluate: '评语评语评语评语评语评语评语评语评语评语评语评语',
};

let worksMock = [];
for (let i = 0; i < 212; i++) {
  let tmpWorks = [];
  // let randomNumber = Math.ceil(Math.random() * 3);
  // for (let j = 0; j < randomNumber; j++) {
  //   tmpWorks.push(...cardMock.works[0]);
  // }
  worksMock.push({ ...cardMock, id: i + 1 });
}

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
  'GET /api/works': (req, res) => {
    console.log('GET /api/works');
    let { category, limit, page } = req.query;
    // let category = req.query && req.query.category;
    // let limit = req.query && req.query.limit;
    // let page = req.query && req.query.page;
    category = parseInt(category);
    limit = parseInt(limit);
    page = parseInt(page);
    console.log('req.query: ', req && req.query);

    let result = {
      total: worksMock.length,
      count: 0,
      works: [],
      rate5Max: 5,
      rate3Max: 10,
      rate1Max: 50,
    };
    let worksAll = worksMock;
    let worksRate5 = worksMock.filter(work => work.rate === 5);
    let worksRate3 = worksMock.filter(work => work.rate === 3);
    let worksRate1 = worksMock.filter(work => work.rate === 1);
    let worksUn = worksMock.filter(work => work.rate === undefined);
    let worksOut = worksMock.filter(work => work.rate === 0);
    result.totalCount = worksAll.length;
    result.rate5Count = worksRate5.length;
    result.rate3Count = worksRate3.length;
    result.rate1Count = worksRate1.length;
    result.unCount = worksUn.length;
    result.outCount = worksOut.length;
    result.rate5List = worksRate5;
    result.rate3List = worksRate3;
    result.rate1List = worksRate1;
    switch (category) {
      case 0:
        result.works = worksAll.slice((page - 1) * limit, page * limit);
        break;
      case 1:
        result.works = worksRate5.slice((page - 1) * limit, page * limit);
        break;
      case 2:
        result.works = worksRate3.slice((page - 1) * limit, page * limit);
        break;
      case 3:
        result.works = worksRate1.slice((page - 1) * limit, page * limit);
        break;
      case 4:
        result.works = worksUn.slice((page - 1) * limit, page * limit);
        break;
      case 5:
        result.works = worksOut.slice((page - 1) * limit, page * limit);
        break;
      default:
        break;
    }

    res.send(result);
  },
  'POST /api/works/un': (req, res) => {
    console.log('POST /api/works/un: ', req.body);

    const { id } = req.body;

    let flag = 300;

    for (let i = 0; i < worksMock.length; i++) {
      if (worksMock[i].id === id) {
        worksMock[i].rate = null;
        worksMock[i].evaluate = '';
        flag = 200;
        break;
      }
    }

    console.log('POST /api/works/un flag: ', flag);

    res.send({
      status: flag,
    });
  },
  'POST /api/works/out': (req, res) => {
    console.log('POST /api/works/out: ', req.body);

    const { id } = req.body;

    let flag = 300;

    for (let i = 0; i < worksMock.length; i++) {
      if (worksMock[i].id === id) {
        worksMock[i].rate = 0;
        flag = 200;
        break;
      }
    }

    console.log('POST /api/works/out flag: ', flag);

    res.send({
      status: flag,
    });
  },
  'POST /api/works/out/batch': (req, res) => {
    console.log('POST /api/works/out/batch: ', req.body);

    const { ids } = req.body;

    console.log('here: ', typeof ids, ids);

    let flag = 300;

    // 有什么好的算法优化一下吗
    for (let j = 0; j < ids.length; j++) {
      for (let i = 0; i < worksMock.length; i++) {
        if (worksMock[i].id === ids[j]) {
          worksMock[i].rate = 0;
          break;
        }
      }
      if (j === ids.length - 1) {
        flag = 200;
      }
    }

    // console.log('POST /api/works/out flag: ', flag);

    res.send({
      status: flag,
    });
  },
  'POST /api/works/edit': (req, res) => {
    console.log('POST /api/works/edit: ', req.body);

    const { id, rate, evaluate } = req.body;

    let flag = 300;

    for (let i = 0; i < worksMock.length; i++) {
      if (worksMock[i].id === id) {
        worksMock[i].rate = rate;
        worksMock[i].evaluate = evaluate;
        worksMock[i].un = false;
        worksMock[i].out = false;
        flag = 200;
        break;
      }
    }

    console.log('POST /api/works/edit flag: ', flag);

    res.send({
      status: flag,
    });
  },
};
