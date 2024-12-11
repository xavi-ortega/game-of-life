import { debounce } from "./debounce";

describe("debounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should call the debounced function after the specified delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn("test");
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("should reset the timer if the debounced function is called again within the delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn("first call");
    jest.advanceTimersByTime(200);

    debouncedFn("second call");
    jest.advanceTimersByTime(200);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("second call");
  });

  it("should not call the function if not enough time has passed", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn("test");
    jest.advanceTimersByTime(299);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
