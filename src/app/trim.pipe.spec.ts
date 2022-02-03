import { TrimPipe } from './trim.pipe';

describe('TrimPipe', () => {
  it('creates an instance', () => {
    const pipe = new TrimPipe();
    expect(pipe).toBeTruthy();
  });
  it('trims strings with leading and trailing spaces', () => {
    const pipe = new TrimPipe();
    expect(pipe.transform("  f   ")).toEqual("f");
  });
  it('preserves strings without spaces', () => {
    const pipe = new TrimPipe();
    expect(pipe.transform("nospaces")).toEqual("nospaces");
  });
});
