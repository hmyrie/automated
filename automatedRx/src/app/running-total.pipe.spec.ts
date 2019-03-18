import { RunningTotalPipe } from './running-total.pipe';

describe('RunningTotalPipe', () => {
  it('create an instance', () => {
    const pipe = new RunningTotalPipe();
    expect(pipe).toBeTruthy();
  });
});
