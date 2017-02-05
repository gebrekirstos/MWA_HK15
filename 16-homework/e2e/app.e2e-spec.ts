import { Homework15Page } from './app.po';

describe('homework15 App', function() {
  let page: Homework15Page;

  beforeEach(() => {
    page = new Homework15Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
