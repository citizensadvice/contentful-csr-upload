export const expectedFields = {
  name: { "en-GB": "test supplier" },
  rank: { "en-GB": 99 },
  complaintsNumber: { "en-GB": 3 },
  complaintsRating: { "en-GB": 3 },
  complaintsRatingScore: { "en-GB": 3 },
  billAccuracyAndMeteringRating: { "en-GB": 2 },
  billsAccuracySmart: { "en-GB": 78.9 },
  billsAccuracyTraditional: { "en-GB": 86.3 },
  smartOperating: { "en-GB": 99.9 },
  contactWebchatSync: { "en-GB": "" },
  contactWebchatAsync: { "en-GB": null },
  contactWhatsappSync: { "en-GB": "" },
  contactWhatsappAsync: { "en-GB": null },
  contactInAppSync: { "en-GB": "" },
  contactInAppAsync: { "en-GB": null },
  contactSmsSync: { "en-GB": "" },
  contactSmsAsync: { "en-GB": null },
  contactPortalSync: { "en-GB": "" },
  contactPortalAsync: { "en-GB": null },
  dataAvailable: { "en-GB": true },
  overallRating: { "en-GB": 3.5 },
  contactEmail: { "en-GB": 99.3 },
  contactRating: { "en-GB": 3 },
  contactSocialMedia: { "en-GB": "99,000" },
  contactTime: { "en-GB": "00:11:30" },
  guaranteeRating: { "en-GB": 4.32 },
  supplierId: { "en-GB": 1 },
  slug: { "en-GB": "test-supplier" },
  contactInfo: {
    "en-GB": {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "hyperlink",
              content: [
                {
                  nodeType: "text",
                  marks: [],
                  value: "01234 5678910",
                  data: {},
                },
              ],
              data: { uri: "tel:012345678910" },
            },
            { nodeType: "text", marks: [], value: "\n", data: {} },
            {
              nodeType: "hyperlink",
              content: [
                {
                  nodeType: "text",
                  marks: [],
                  value: "www.example.com",
                  data: {},
                },
              ],
              data: { uri: "https://www.example.com" },
            },
          ],
          data: {},
        },
      ],
    },
  },
  billingInfo: {
    "en-GB": {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "hyperlink",
              content: [
                {
                  nodeType: "text",
                  marks: [],
                  value: "billing@example.com",
                  data: {},
                },
              ],
              data: { uri: "mailto:billing@example.com" },
            },
          ],
          data: {},
        },
      ],
    },
  },
  fuelMix: {
    "en-GB": {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "text",
              marks: [],
              value: "Fossil fuel: 55%,",
              data: {},
            },
          ],
          data: {},
        },
        {
          nodeType: "paragraph",
          content: [
            { nodeType: "text", marks: [], value: "Nuclear: 11%,", data: {} },
          ],
          data: {},
        },
        {
          nodeType: "paragraph",
          content: [
            { nodeType: "text", marks: [], value: "Renewable: 29%,", data: {} },
          ],
          data: {},
        },
        {
          nodeType: "paragraph",
          content: [
            { nodeType: "text", marks: [], value: "Other: 4%", data: {} },
          ],
          data: {},
        },
      ],
    },
  },
  guaranteeList: {
    "en-GB": {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "unordered-list",
          content: [
            {
              nodeType: "list-item",
              content: [
                {
                  nodeType: "paragraph",
                  data: {},
                  content: [
                    {
                      nodeType: "text",
                      marks: [],
                      value: "guarantee 1",
                      data: {},
                    },
                  ],
                },
              ],
              data: {},
            },
            {
              nodeType: "list-item",
              content: [
                {
                  nodeType: "paragraph",
                  data: {},
                  content: [
                    {
                      nodeType: "text",
                      marks: [],
                      value: "guarantee 2",
                      data: {},
                    },
                  ],
                },
              ],
              data: {},
            },
            {
              nodeType: "list-item",
              content: [
                {
                  nodeType: "paragraph",
                  data: {},
                  content: [
                    {
                      nodeType: "text",
                      marks: [],
                      value: "guarantee 3",
                      data: {},
                    },
                  ],
                },
              ],
              data: {},
            },
          ],
          data: {},
        },
      ],
    },
  },
  openingHours: {
    "en-GB": {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "text",
              marks: [],
              value:
                "Monday: 9am - 5pm,\nTuesday: 9am - 5pm,\nWednesday: 9am - 5pm,\nThursday: 9am - 5pm,\nFriday: 9am - 5pm,\nSaturday: Closed,\nSunday: Closed",
              data: {},
            },
          ],
          data: {},
        },
      ],
    },
  },
};
