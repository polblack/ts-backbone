import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.tplt.html');
  
  const output = stats.toJson().modules[0].source;

  expect(output).toBe(`export default "Hey Alice!\\n"`);
});
