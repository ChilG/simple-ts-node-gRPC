const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export default sleep;
