import { CecsCmsPage } from './app.po';

describe('cecs-cms App', () => {
  let page: CecsCmsPage;

  beforeEach(() => {
    page = new CecsCmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
