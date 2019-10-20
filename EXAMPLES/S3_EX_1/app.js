console.log(process.env);

delete process.env.LC_CTYPE;

console.log(process.env);
