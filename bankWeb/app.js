const datas = require('./src/data');

const read = async () => {
    const dat = await datas.loadData();
    for (let d in dat) {
        console.log(dat[d].name);
    }
};
read();
