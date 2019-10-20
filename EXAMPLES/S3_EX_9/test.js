import { Selector } from 'testcafe';
fixture `My first test`
    .page `http://github.com/`;
test('Find "testcafe" repository on GitHub', async t => {
    await t
        .typeText('form[action="/search"] input[name="q"]', 'testcafe' )
        .pressKey('enter')
        .expect(Selector('.repo-list > li > div > h3').innerText).eql('DevExpress/testcafe');
});

