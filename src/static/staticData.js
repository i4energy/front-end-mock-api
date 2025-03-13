import { mockTreeAssetsMap } from "../utils/generateUtils.js";

export const staticMockTreeStructure = {
    "id": "m7mszwme_hj37klg5679_0",
    "parentIDs": [],
    "type": "customer",
    "title": "MAS Mock",
    "uPath": "MAS Mock",
    "childrenCount": 5,
    "children": [
        {
            "id": "m7mt0gkv_nga79cxvut5m_1",
            "parentIDs": ["m7mszwme_hj37klg5679_0"],
            "type": "customer",
            "title": "Asset 1",
            "infoLink": "/mock_tree/assets/asset_1/info",
            "link": "/mock_tree/assets/asset_1/topics",
            "treeLink": "/mock_tree/assets/asset_1/topics",
            "uPath": "MAS_Mock/Assets/Asset_1",
            "childrenCount": mockTreeAssetsMap.asset_1.topicsCount,
            "children": []
        },
        {
            "id": "m7mt0gkv_nga79cxvut5m_2",
            "parentIDs": ["m7mszwme_hj37klg5679_0"],
            "type": "customer",
            "title": "Asset 2",
            "infoLink": "/mock_tree/assets/asset_2/info",
            "link": "/mock_tree/assets/asset_2/topics",
            "treeLink": "/mock_tree/assets/asset_2/topics",
            "uPath": "MAS_Mock/Assets/Asset_2",
            "childrenCount": mockTreeAssetsMap.asset_2.topicsCount,
            "children": []
        },
        {
            "id": "m7mt0gkv_nga79cxvut5m_3",
            "parentIDs": ["m7mszwme_hj37klg5679_0"],
            "type": "customer",
            "title": "Asset 3",
            "infoLink": "/mock_tree/assets/asset_3/info",
            "link": "/mock_tree/assets/asset_3/topics",
            "treeLink": "/mock_tree/assets/asset_3/topics",
            "uPath": "MAS_Mock/Assets/Asset_3",
            "childrenCount": mockTreeAssetsMap.asset_3.topicsCount,
            "children": []
        },
        {
            "id": "m7mt0gkv_nga79cxvut5m_4",
            "parentIDs": ["m7mszwme_hj37klg5679_0"],
            "type": "customer",
            "title": "Asset 4",
            "infoLink": "/mock_tree/assets/asset_4/info",
            "link": "/mock_tree/assets/asset_4/topics",
            "treeLink": "/mock_tree/assets/asset_4/topics",
            "uPath": "MAS_Mock/Assets/Asset_4",
            "childrenCount": mockTreeAssetsMap.asset_4.topicsCount,
            "children": []
        },
        {
            "id": "m7mt0gkv_nga79cxvut5m_5",
            "parentIDs": ["m7mszwme_hj37klg5679_0"],
            "type": "customer",
            "title": "Asset 5",
            "infoLink": "/mock_tree/assets/asset_5/info",
            "link": "/mock_tree/assets/asset_5/topics",
            "treeLink": "/mock_tree/assets/asset_5/topics",
            "uPath": "MAS_Mock/Assets/Asset_5",
            "childrenCount": mockTreeAssetsMap.asset_5.topicsCount,
            "children": []
        }
    ]
}

// http://localhost:8005/api/v1/topic-tree/registers/29194/info/headers?language_id=en
export const staticTopicHeaders = [
    {
        field: 'description',
        headerName: 'Description',
        returnType: 'value'
    },
    {
        field: 'tagName',
        headerName: 'Tag Name',
        returnType: 'value'
    },
    {
        field: 'address',
        headerName: 'Address',
        returnType: 'value'
    },
    {
        field: 'dataType',
        headerName: 'Data Type',
        returnType: 'value'
    },
    {
        field: 'clientAccess',
        headerName: 'Access Level',
        returnType: 'value'
    },
    {
        field: 'supportsControl',
        headerName: 'Allow Control',
        returnType: 'value'
    },
    {
        field: 'protocol',
        headerName: 'Protocol',
        returnType: 'value'
    },
    {
        field: 'scanRate',
        headerName: 'Sampling Period (mSec)',
        returnType: 'value'
    },
    {
        field: 'saveValues',
        headerName: 'Stored Values',
        returnType: 'value'
    },
    {
        field: 'hasThirdPartyConnections',
        headerName: 'Allow Third-Party Connections',
        returnType: 'value'
    },
    {
        field: 'dt',
        headerName: 'Last Value Received at',
        returnType: 'value'
    }
];

// http://localhost:8005/api/v1/topic-tree/registers/29194/info?extendedView=true&language_id=en
export const staticTopicInfo = {
    id: 29195,
    topic: 'DEFAULT//DEVICE1/123/f1883452-f5ea-4f49-b10f-1b30ea883072',
    displayName: { text: '123', languageID: 'en' },
    description: '123123',
    tagName: '123',
    queryName: null,
    esIndex: null,
    address: '12332',
    dataType: 'DWord',
    clientAccess: 'Read/Write',
    supportsControl: false,
    protocol: 'Modbus TCP/IP',
    scanRate: 1000,
    saveValues: true,
    hasThirdPartyConnections: false,
    unitInfo: { unitSourceID: null, unitSystemID: null, unitOutputID: null },
    scaling: { scalingTypeID: null, rawLow: null, rawHigh: null, clampLow: null, clampHigh: null, scaledLow: null, scaledHigh: null },
    aggregations: [
        {
            registerAggregationID: 18699,
            aggregationEsIndex: null,
            predefinedOptionID: 1,
            intervalID: 2,
            intervalValue: 1,
            functions: [ 1, 2, 3, 4, 5]
        },
        {
            registerAggregationID: 18700,
            aggregationEsIndex: null,
            predefinedOptionID: 2,
            intervalID: 3,
            intervalValue: 1,
            functions: [ 1, 2, 3, 4, 5]
        },
        {
            registerAggregationID: 18701,
            aggregationEsIndex: null,
            predefinedOptionID: 4,
            intervalID: 1,
            intervalValue: 1,
            functions: [ 1, 2, 3, 4, 5]
        },
        {
            registerAggregationID: 18702,
            aggregationEsIndex: null,
            predefinedOptionID: 6,
            intervalID: 5,
            intervalValue: 1,
            functions: [ 1, 2, 3, 4, 5]
        }
    ],
    source: { id: 3392, key: 'Device1', type: 'device', link: '/stations/-1/devices/3392' },
    mqttInfoPath: 'DEFAULT//DEVICE1/123/F1883452-F5EA-4F49-B10F-1B30EA883072/INFO'
}

// http://localhost:8005/api/v1/topic-tree/devices/3392/info/headers?language_id=en
export const staticAssetHeaders = [
    {
        field: 'entityName',
        headerName: 'Name',
        returnType: 'object'
    },
    {
        field: 'category',
        headerName: 'Category',
        returnType: 'value'
    },
    {
        field: 'model',
        headerName: 'Model',
        returnType: 'value'
    },
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        returnType: 'value'
    },
    {
        field: 'protocol',
        headerName: 'Protocol',
        returnType: 'value'
    }
]

// http://localhost:8005/api/v1/topic-tree/devices/3392/info?extendedView=true&language_id=en
export const staticAssetInfo = {
    id: 3392,
    topic: 'Device1',
    stationID: -1,
    stationTopic: 'DEFAULT',
    entityName: [
        { text: 'USE THIS', languageID: 'en' },
        { text: 'USE THIS', languageID: 'el' }
    ],
    category: 'Panel Power Meters',
    model: 'EasyGen TEST',
    manufacturer: 'SIEMENS',
    protocol: 'Modbus TCP/IP'
}