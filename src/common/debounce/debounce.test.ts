import {debounce} from "./debounce";

describe(debounce.name, () => {
  const FRAME_DURATION_MS = 1000 / 60;

  it('should work for two immediate calls', (done) => {
    let result = 0;
    const func = () => {
      result++;
    };
    const debounced = debounce(func, 500);
    debounced();
    debounced();
    setTimeout(() => {
      expect(result).toEqual(1);
      done();
    }, 500 + FRAME_DURATION_MS);
  });

  it('should work for two timed calls', (done) => {
    let result = 0;
    const func = () => {
      result++;
    };
    const debounced = debounce(func, 500);

    setTimeout(() => {
      debounced();
    }, 1);

    setTimeout(() => {
      debounced();
    }, 499);

    setTimeout(() => {
      expect(result).toEqual(1);
      done();
    }, 499 + 500 + FRAME_DURATION_MS);
  });

  it('should call multiple times if fired after reaching timeout', (done) => {
    let result = 0;
    const func = () => {
      result++;
    };
    const debounced = debounce(func, 500);
    debounced();

    setTimeout(() => {
      debounced();
    }, 500 + FRAME_DURATION_MS);

    setTimeout(() => {
      debounced();
    }, 1000 + FRAME_DURATION_MS + FRAME_DURATION_MS);

    setTimeout(() => {
      expect(result).toEqual(3);
      done();
    }, 1500 + FRAME_DURATION_MS + FRAME_DURATION_MS + FRAME_DURATION_MS);
  })
})