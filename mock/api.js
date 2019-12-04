var cardMock = {
  id: 0,
  title: '作品标题作品标题',
  desc: '我是小刺猬木木，是一枚烧烤美食探索家，很高兴认识大家！',
  banner: {
    id: 3862,
    width: 2480,
    height: 2779,
    createdAt: '2019-11-12T03:35:22.000Z',
    updatedAt: '2019-11-12T03:35:22.000Z',
    url: '//hbimg.huabanimg.com/67806f9da7eceda8fa4e7b66838e9f0fd6faf48c',
  },
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
  pins: [
    {
      file: {
        url: '//hbimg.huabanimg.com/b400e9baebca1d7423f2d760f6b0269c2bc9c15a1f4606-kQpykn',
      },
      raw_text: '木屋烧烤吉祥物设计“木木”效果展示',
    },
    {
      file: {
        url: '//hbimg.huabanimg.com/8ece983c51b881059749dc814387ccc1bbb4597752c146-XsSHbD',
      },
      raw_text:
        '小刺猬木木是一名烧烤美食探索家，他最爱制作和品尝烧烤，对食材的要求非常高，常常到野外去寻觅自然新鲜的食材。而且不管去到哪儿他都会将自己亲手打造的木屋房子戴在头上，对他来说，“有木屋的地方就是家”。木木热情豪爽，乐观开朗，喜欢结交朋友，他将收集的食材做成色香味俱佳的烧烤，和朋友们欢聚一堂，把酒畅嗨，举杯相庆。所谓“欢聚时光在木屋”，木木的人生格言就是：每一天，都值得庆祝!',
    },
    {
      file: {
        url: '//hbimg.huabanimg.com/5bbbfdcdc481bdf198543fe3983bf4ecece4673afe0f-eM89DL',
      },
      raw_text: '',
    },
  ],
  user: {
    username: '【Aigil】',
    // avatar: {
    //   id: 257115032,
    //   farm: 'farm1',
    //   bucket: 'hbimg',
    //   key: '104f1e8eac7635304bf93cc0ec22abb79e8d0dc81452-7ya6Yw',
    //   type: 'image/jpeg',
    //   height: 132,
    //   width: 132,
    //   frames: 1,
    // },
    avatar: {
      id: 281960867,
      farm: 'farm1',
      type: 'image/jpeg',
      width: 3024,
      height: 4032,
      frames: 1,
      url: '//hbimg.huabanimg.com/4eb88d295cbb89fce87cb9d6ed6cea066d22cfde852aa-HWLjeU',
    },
  },
  // avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  // username: '用户名',
  // comment: '评语评语评语评语评语评语评语评语评语评语评语评语',
  comment: '',
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

const hash = '2083dc35-79ec-430c-a96b-6054ec15c991';

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
  'GET /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/me': (req, res) => {
    let result = {
      event: {
        title: 'SSSSSSSSDDDDDDD',
      },
      invite: {
        // token: '53e5caaa-2482-49a9-af92-aca58823f1ff',
        token: '2083dc35-79ec-430c-a96b-6054ec15c991',
        name: '张达金',
        maxNum: 20,
        cat: '木屋烧烤评审',
        expire: '2019-12-13T00:00:00.000Z',
        createdAt: '2019-12-04T02:28:31.000Z',
        updatedAt: '2019-12-04T02:28:31.000Z',
        eventId: 80,
      },
    };
    res.send(result);
  },
  // 'GET /api/works': (req, res) => {
  'GET /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/vote/works': (req, res) => {
    console.log('GET /api/works');
    let { rating, limit, page } = req.query;
    // let rating = req.query && req.query.rating;
    // let limit = req.query && req.query.limit;
    // let page = req.query && req.query.page;
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
    let worksRate5 = worksMock.filter(work => work.rating === 5);
    let worksRate4 = worksMock.filter(work => work.rating === 4);
    let worksRate3 = worksMock.filter(work => work.rating === 3);
    let worksRate2 = worksMock.filter(work => work.rating === 2);
    let worksRate1 = worksMock.filter(work => work.rating === 1);
    let worksUn = worksMock.filter(work => work.rating === undefined);
    let worksOut = worksMock.filter(work => work.rating === 0);
    let worksRated = worksMock.filter(work => work.rating !== undefined);
    result.totalCount = worksAll.length;
    result.rate5Count = worksRate5.length;
    result.rate3Count = worksRate3.length;
    result.rate1Count = worksRate1.length;
    result.unCount = worksUn.length;
    result.outCount = worksOut.length;
    result.rate5List = worksRate5;
    result.rate3List = worksRate3;
    result.rate1List = worksRate1;
    switch (rating) {
      case 'all':
        console.log('enter: ', rating);
        result.works = worksAll.slice((page - 1) * limit, page * limit);
        break;
      case '5':
        result.works = worksRate5.slice((page - 1) * limit, page * limit);
        break;
      case '4':
        result.works = worksRate4.slice((page - 1) * limit, page * limit);
        break;
      case '3':
        result.works = worksRate3.slice((page - 1) * limit, page * limit);
        break;
      case '2':
        result.works = worksRate2.slice((page - 1) * limit, page * limit);
        break;
      case '1':
        result.works = worksRate1.slice((page - 1) * limit, page * limit);
        break;
      case 'unrate':
        result.works = worksUn.slice((page - 1) * limit, page * limit);
        break;
      case '0':
        result.works = worksOut.slice((page - 1) * limit, page * limit);
        break;
      case 'rated':
        result.works = worksRated.slice((page - 1) * limit, page * limit);
        break;
      default:
        break;
    }

    let result2 = {
      works: {
        pager: {},
        hits: result.works,
      },
    };

    if (rating === 'all') {
      result2.works.facet = {
        all: worksAll.length,
        5: worksRate5.length,
        4: worksRate4.length,
        3: worksRate3.length,
        2: worksRate2.length,
        1: worksRate1.length,
        0: worksOut.length,
        unrate: worksUn.length,
      };
    }

    res.send(result2);
  },
  'POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/unvote/work/:id': (req, res) => {
    let { id } = req.params;
    console.log(`POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/unvote/work/${id}`, req.body, req.params);
    id = parseInt(id);

    let flag = 300;

    for (let i = 0; i < worksMock.length; i++) {
      if (worksMock[i].id === id) {
        worksMock[i].rating = undefined;
        worksMock[i].comment = '';
        flag = 200;
        break;
      }
    }

    console.log('POST /api/works/un flag: ', flag);

    res.send({
      status: flag,
    });
  },
  'POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/vote/works': (req, res) => {
    console.log('POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/vote/works: ', req.body);

    const { ids } = req.body;

    console.log('here: ', typeof ids, ids);

    let flag = 300;

    // 有什么好的算法优化一下吗
    for (let j = 0; j < ids.length; j++) {
      for (let i = 0; i < worksMock.length; i++) {
        if (worksMock[i].id === ids[j]) {
          worksMock[i].rating = 0;
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
  'POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/vote/work/:id': (req, res) => {
    // 'POST /api/works/edit': (req, res) => {
    let { id } = req.params;
    console.log(`POST /invite/2083dc35-79ec-430c-a96b-6054ec15c991/api/vote/work/${id}`, req.body, req.params);
    id = parseInt(id);
    const { rating, comment } = req.body;

    let flag = 300;

    for (let i = 0; i < worksMock.length; i++) {
      if (worksMock[i].id === id) {
        worksMock[i].rating = rating;
        if (rating !== 0) {
          worksMock[i].comment = comment;
          console.log('POST /api/works/edit: ', req.body);
        } else {
          console.log('POST /api/works/out: ', req.body);
        }

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
