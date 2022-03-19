import { FirstObjValuePipe } from './first-obj-key.pipe';

describe('FirstObjKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstObjValuePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return first value of obj', () => {
    const pipe = new FirstObjValuePipe();
    const value = pipe.transform({ test: 'testV' })
    expect(value).toBe('testV');
  });
});
