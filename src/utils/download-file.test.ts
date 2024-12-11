import { downloadFile } from "./download-file";

describe("downloadFile", () => {
  const blob = new Blob([`{ hello: 'world' }`], { type: "application/json" });
  const fileName = "test-file.json";

  const anchorElementMock: Partial<HTMLAnchorElement> = {
    href: "",
    download: "",
    click: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn().mockReturnValue("mock-url");
    global.URL.revokeObjectURL = jest.fn();

    jest
      .spyOn(document, "createElement")
      .mockReturnValue(anchorElementMock as HTMLAnchorElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create an anchor element and trigger file download", () => {
    downloadFile(blob, fileName);

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(anchorElementMock.href).toBe("mock-url");
    expect(anchorElementMock.download).toBe(fileName);
    expect(anchorElementMock.click).toHaveBeenCalled();
  });

  it("should clean up the object URL and the anchor element after download", () => {
    downloadFile(blob, fileName);

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("mock-url");
    expect(anchorElementMock.remove).toHaveBeenCalled();
  });
});
