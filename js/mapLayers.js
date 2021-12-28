const layers = {
    muniOutline: {
        "id": "municipality-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "municipalities",
        "paint": {
            'line-width': 1,
            'line-color': '#4a5c64'
        }
    },
    muniFill: {
        'id': 'municipality-fill',
        'type': 'fill',
        'source': 'boundaries',
        'source-layer': 'municipalities',
        'layout': {},
        'paint': {
            'fill-color': 'rgba(0,0,0,0)',
            'fill-opacity': 0
        }
    },
    muniHover: {
        "id": "municipality-hover",
        "type": "line",
        "source": "boundaries",
        "source-layer": "municipalities",
        "paint": {
            'line-width': 2,
            'line-color': '#0074ad'
        },
        'filter': [
            '==',
            'geoid',
            ''
          ]
    }
    // add more layers here
}

export default layers