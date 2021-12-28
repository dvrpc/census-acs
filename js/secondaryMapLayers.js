const secondaryLayers = {
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 2.5,
            'line-color': '#505a5e'
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes"
        ]
    },
    countyHover: {
        "id": "county-hover",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 3.5,
            'line-color': '#0074ad'
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes",
            "==",
            'geoid',
            ''
          ]
    },
    countyFill: {
        'id': 'county-fill',
        'type': 'fill',
        'source': 'boundaries',
        'source-layer': 'county',
        'layout': {},
        'paint': {
            'fill-color': 'rgba(0,0,0,0)',
            'fill-opacity': 0
        }
    }
}

export default secondaryLayers