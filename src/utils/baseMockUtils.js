export const baseAlertMocks = [
  {
    names: [
      {
        languageID: "en",
        text: "Alarm 1",
      },
      {
        languageID: "el",
        text: "Alarm 1",
      },
    ],
    descriptions: [
      {
        languageID: "en",
        text: "Alarm 1 description",
      },
      {
        languageID: "el",
        text: "Alarm 1 description",
      },
    ],
    messages: [
      {
        languageID: "en",
        text: "Alarm 1",
      },
      {
        languageID: "el",
        text: "Alarm 1",
      },
    ],
    topic: {
      id: "d1a22dd7d28a30118d0f9202c41ee82c",
      path: "DEFAULT//DEVICE1/11122/c2733a6c-2671-4776-a05c-848ffba2b383",
      uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/11122",
    },
    type: "analog",
    isAcknowledgeable: true,
    isActive: true,
    series: [],
    rules: [
      {
        id: "6778d4f44fd4300bd6f5d2a5",
        names: [
          {
            languageID: "en",
            text: "Rule 1",
          },
          {
            languageID: "el",
            text: "Rule 1",
          },
        ],
        minValue: 0,
        maxValue: 1,
        minEquality: false,
        maxEquality: false,
        severityID: 874,
      },
      {
        id: "67ca9141b31ad2b3b23b1d36",
        names: [
          {
            languageID: "en",
            text: "Rule 2",
          },
          {
            languageID: "el",
            text: "Rule 2",
          },
        ],
        minValue: 1,
        maxValue: 2,
        severityID: 874,
      },
      {
        id: "67ca9141b31ad2b3b23b1d37",
        names: [
          {
            languageID: "en",
            text: "Rule 3",
          },
          {
            languageID: "el",
            text: "Rule 3",
          },
        ],
        minValue: 2,
        maxValue: 3,
        severityID: 873,
      },
    ],
    categoryID: 870,
    id: "6778d4f44fd4300bd6f5d2a4",
  },
  {
    names: [
      {
        languageID: "en",
        text: "Alarm 2",
      },
      {
        languageID: "el",
        text: "Alarm 2",
      },
    ],
    descriptions: [
      {
        languageID: "en",
        text: "Alarm 2 description",
      },
      {
        languageID: "el",
        text: "Alarm 2 description",
      },
    ],
    messages: [
      {
        languageID: "en",
        text: "Alarm 2",
      },
      {
        languageID: "el",
        text: "Alarm 2",
      },
    ],
    topic: {
      id: "d1a22dd7d28a30118d0f9202c41ee82c",
      path: "DEFAULT//DEVICE1/11122/c2733a6c-2671-4776-a05c-848ffba2b383",
      uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/11122",
    },
    type: "digital",
    isAcknowledgeable: true,
    isActive: true,
    rules: [
      {
        id: "67ca91beb31ad2b3b23b1d39",
        names: [
          {
            languageID: "en",
            text: "Rule 1",
          },
          {
            languageID: "el",
            text: "Rule 1",
          },
        ],
        topic: {
          id: "d1a22dd7d28a30118d0f9202c41ee82c",
          path: "DEFAULT//DEVICE1/11122/c2733a6c-2671-4776-a05c-848ffba2b383",
          uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/11122",
        },
        value: 0,
        severityID: 874,
      },
      {
        id: "67ca91beb31ad2b3b23b1d3a",
        names: [
          {
            languageID: "en",
            text: "Rule 2",
          },
          {
            languageID: "el",
            text: "Rule 2",
          },
        ],
        topic: {
          id: "d1a22dd7d28a30118d0f9202c41ee82c",
          path: "DEFAULT//DEVICE1/11122/c2733a6c-2671-4776-a05c-848ffba2b383",
          uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/11122",
        },
        value: 1,
        severityID: 873,
      },
    ],
    categoryID: 870,
    hasSpeedRecorder: false,
    id: "67ca91beb31ad2b3b23b1d38",
  },
];

export const baseEventMocks = [
  {
    names: [
      {
        languageID: "en",
        text: "Event 1",
      },
      {
        languageID: "el",
        text: "Event 1",
      },
    ],
    descriptions: [
      {
        languageID: "en",
        text: "Event 1 description",
      },
      {
        languageID: "el",
        text: "Event 1 description",
      },
    ],
    messages: [
      {
        languageID: "en",
        text: "Event 1",
      },
      {
        languageID: "el",
        text: "Event 1",
      },
    ],
    topic: {
      id: "16d26ba79454e1e2186ce61f44fd02fb",
      path: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      originalPath: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/123",
    },
    type: "analog",
    isActive: true,
    rules: [
      {
        id: "67ca9206b31ad2b3b23b1d3c",
        names: [
          {
            languageID: "en",
            text: "Rule 1",
          },
          {
            languageID: "el",
            text: "Rule 1",
          },
        ],
        minValue: 0,
        maxValue: 1,
        minEquality: false,
        maxEquality: false,
      },
      {
        id: "67ca9206b31ad2b3b23b1d3d",
        names: [
          {
            languageID: "en",
            text: "Rule 2",
          },
          {
            languageID: "el",
            text: "Rule 2",
          },
        ],
        minValue: 1,
        maxValue: 2,
        minEquality: false,
        maxEquality: false,
      },
    ],
    categoryID: 870,
    hasSpeedRecorder: false,
    id: "67ca9206b31ad2b3b23b1d3b",
  },
  {
    names: [
      {
        languageID: "en",
        text: "Event 2",
      },
      {
        languageID: "el",
        text: "Event 2",
      },
    ],
    descriptions: [
      {
        languageID: "en",
        text: "Event 2 description",
      },
      {
        languageID: "el",
        text: "Event 2 description",
      },
    ],
    messages: [
      {
        languageID: "en",
        text: "Event 2",
      },
      {
        languageID: "el",
        text: "Event 2",
      },
    ],
    topic: {
      id: "16d26ba79454e1e2186ce61f44fd02fb",
      path: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      originalPath: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/123",
    },
    type: "digital",
    isActive: true,
    rules: [
      {
        id: "67ca924eb31ad2b3b23b1d3f",
        names: [
          {
            languageID: "en",
            text: "Rule 1",
          },
          {
            languageID: "el",
            text: "Rule 1",
          },
        ],
        value: 1,
      },
      {
        id: "67ca924eb31ad2b3b23b1d40",
        names: [
          {
            languageID: "en",
            text: "Rule 2",
          },
          {
            languageID: "el",
            text: "Rule 2",
          },
        ],
        value: 1,
      },
    ],
    categoryID: 870,
    hasSpeedRecorder: false,
    id: "67ca924eb31ad2b3b23b1d3e",
  },
  {
    names: [
      {
        languageID: "en",
        text: "Event 3",
      },
      {
        languageID: "el",
        text: "Event 3",
      },
    ],
    descriptions: [
      {
        languageID: "en",
        text: "Event 3 description",
      },
      {
        languageID: "el",
        text: "Event 3 description",
      },
    ],
    messages: [
      {
        languageID: "en",
        text: "Event 3",
      },
      {
        languageID: "el",
        text: "Event 3",
      },
    ],
    topic: {
      id: "16d26ba79454e1e2186ce61f44fd02fb",
      path: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      originalPath: "DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072",
      uPath: "MAS/Basic/Basic Record 1/Devices/USE THIS/123",
    },
    type: "enumerator",
    isActive: true,
    rules: [
      {
        id: "67ca9288b31ad2b3b23b1d42",
        names: [
          {
            languageID: "en",
            text: "Rule 1",
          },
          {
            languageID: "el",
            text: "Rule 1",
          },
        ],
        speedRecValue: 0,
      },
      {
        id: "67ca9288b31ad2b3b23b1d43",
        names: [
          {
            languageID: "en",
            text: "Rule 2",
          },
          {
            languageID: "el",
            text: "Rule 2",
          },
        ],
        speedRecValue: 1,
      },
    ],
    hasSpeedRecorder: false,
    categoryID: 870,
    id: "67ca9288b31ad2b3b23b1d41",
  },
];
