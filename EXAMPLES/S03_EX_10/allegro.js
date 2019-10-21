import { Selector } from 'testcafe';
import * as fs from 'fs';

fixture `Getting Started`
    .page `https://allegro.pl`;

const sortSelect = Selector('select[data-value="m"]');
const sortOption = sortSelect.find('option');
const allegro_pass =  fs.readFileSync('../all.xxx').toString();

test('My first test', async t => {
    await t
        .click('div [data-role="rodo-modal-body"] button')
        .click(Selector('button > span').withText(/Moje Allegro/))
        .click(Selector('a').withText(/ZALOGUJ/))
        .typeText('input#username', 'my_username')
        .typeText('input#password', allegro_pass)
        .pressKey('enter')
        .wait(1000)
        .typeText('input[data-role="search-input"]', 'chromebook')
        .pressKey('enter')
        .click(sortSelect)
        .click(sortOption.withText('cena: od najwyższej'))
        .wait(1000)
        .takeScreenshot();
});

