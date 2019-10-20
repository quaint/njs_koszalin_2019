import { Selector } from 'testcafe';

fixture `Example page`
    .page `http://devexpress.github.io/testcafe/example/`;

test('My test', async t => {
    const osCount            = Selector('.column.col-2 label').count;
    const submitButtonExists = Selector('#submit-button').exists;

    await t
        .expect(osCount).eql(3)
        .expect(submitButtonExists).ok();
});

