import { describe, it, expect } from "vitest";
import markdownToJson from "./markdownToJson";

const testSupplier = {
  fieldWithUnorderedList: "- guarantee 1\n- guarantee 2",
  fieldWithUrl: "Website: <https://octopus.energy>",
  fieldWithEmailLink: "[billing@example.com](mailto:billing@example.com)",
  fieldWithLink: "[Some website](https://www.example.com)",
  fieldWithListAndLinks:
    "- [Switch Guarantee](https://www.energy-uk.org.uk/our-work/energy-switch-guarantee)\n" +
    "- [Vulnerability Commitment](https://www.energy-uk.org.uk/our-work/vulnerability-commitment)",
  fieldWithNewlines:
    "Monday: 9am-5pm\n" +
    "Tuesday: 9am-5pm\n" +
    "Wednesday: 9am-5pm\n" +
    "Thursday: 9am-5pm\n" +
    "Friday: 9am-4pm\n" +
    "Saturday: Closed\n" +
    "Sunday: Closed",
  fieldWithParagraphs:
    "Fossil fuel: 55%\n" +
    "\n" +
    "Nuclear: 11%\n" +
    "\n" +
    "Renewable: 29%\n" +
    "\n" +
    "Other: 4%",
};

describe("markdownToJson", () => {
  it("converts markdown formatting for newlines to html", () => {
    expect(markdownToJson(testSupplier.fieldWithNewlines)).toEqual({
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value:
                "Monday: 9am-5pm\nTuesday: 9am-5pm\nWednesday: 9am-5pm\nThursday: 9am-5pm\nFriday: 9am-4pm\nSaturday: Closed\nSunday: Closed",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for paragraphs to html", () => {
    expect(markdownToJson(testSupplier.fieldWithParagraphs)).toEqual({
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Fossil fuel: 55%",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Nuclear: 11%",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Renewable: 29%",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Other: 4%",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for links to html", () => {
    expect(markdownToJson(testSupplier.fieldWithLink)).toEqual({
      content: [
        {
          content: [
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: "text",
                  value: "Some website",
                },
              ],
              data: {
                uri: "https://www.example.com",
              },
              nodeType: "hyperlink",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for urls to html", () => {
    expect(markdownToJson(testSupplier.fieldWithUrl)).toEqual({
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "Website: ",
            },
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: "text",
                  value: "https://octopus.energy",
                },
              ],
              data: {
                uri: "https://octopus.energy",
              },
              nodeType: "hyperlink",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for email links to html", () => {
    expect(markdownToJson(testSupplier.fieldWithEmailLink)).toEqual({
      content: [
        {
          content: [
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: "text",
                  value: "billing@example.com",
                },
              ],
              data: {
                uri: "mailto:billing@example.com",
              },
              nodeType: "hyperlink",
            },
          ],
          data: {},
          nodeType: "paragraph",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for unordered lists to html", () => {
    expect(markdownToJson(testSupplier.fieldWithUnorderedList)).toEqual({
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
            {
              content: [
                {
                  content: [
                    {
                      data: {},
                      marks: [],
                      nodeType: "text",
                      value: "guarantee 1",
                    },
                  ],
                  data: {},
                  nodeType: "paragraph",
                },
              ],
              data: {},
              nodeType: "list-item",
            },
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
            {
              content: [
                {
                  content: [
                    {
                      data: {},
                      marks: [],
                      nodeType: "text",
                      value: "guarantee 2",
                    },
                  ],
                  data: {},
                  nodeType: "paragraph",
                },
              ],
              data: {},
              nodeType: "list-item",
            },
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
          ],
          data: {},
          nodeType: "unordered-list",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });

  it("converts markdown formatting for unordered lists with links to html", () => {
    expect(markdownToJson(testSupplier.fieldWithListAndLinks)).toEqual({
      content: [
        {
          content: [
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
            {
              content: [
                {
                  content: [
                    {
                      content: [
                        {
                          data: {},
                          marks: [],
                          nodeType: "text",
                          value: "Switch Guarantee",
                        },
                      ],
                      data: {
                        uri: "https://www.energy-uk.org.uk/our-work/energy-switch-guarantee",
                      },
                      nodeType: "hyperlink",
                    },
                  ],
                  data: {},
                  nodeType: "paragraph",
                },
              ],
              data: {},
              nodeType: "list-item",
            },
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
            {
              content: [
                {
                  content: [
                    {
                      content: [
                        {
                          data: {},
                          marks: [],
                          nodeType: "text",
                          value: "Vulnerability Commitment",
                        },
                      ],
                      data: {
                        uri: "https://www.energy-uk.org.uk/our-work/vulnerability-commitment",
                      },
                      nodeType: "hyperlink",
                    },
                  ],
                  data: {},
                  nodeType: "paragraph",
                },
              ],
              data: {},
              nodeType: "list-item",
            },
            {
              data: {},
              marks: [],
              nodeType: "text",
              value: "\n",
            },
          ],
          data: {},
          nodeType: "unordered-list",
        },
      ],
      data: {},
      nodeType: "document",
    });
  });
});
