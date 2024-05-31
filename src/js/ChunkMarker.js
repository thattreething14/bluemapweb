import { ShapeMarker } from "./markers/ShapeMarker";
import { PopupMarker } from "@/js/PopupMarker";
import { Color, Shape } from "three";
import axios from 'axios';

export class ChunkMarker extends PopupMarker {
    constructor(id, appState, events) {
        super(id, appState, events);
        this.chunkMarker = new ShapeMarker("chunkMarker");

        const redColor = new Color(0xff0000); // red
        const opacity = 0.5;
        this.chunkMarker.fill.material.uniforms.markerColor.value = redColor;
        this.chunkMarker.fill.material.uniforms.markerOpacity.value = opacity;
        this.chunkMarker.setShapeY(300)
        this.eventEmitter.on('coordinatesUpdated', (coordinates) => {
            this.updateChunkMarkerPosition(coordinates);
            this.saveChunkInfo(coordinates);
        });
        this.add(this.chunkMarker);
    }

    updateChunkMarkerPosition(coordinates) {
        const chunkX = Math.floor(coordinates.x / 16) * 16;
        const chunkY = Math.floor(coordinates.z / 16) * 16;
        const offsetX = coordinates.x - chunkX;
        const offsetY = coordinates.z - chunkY;
        const chunkShape = new Shape();
        const chunkWidth = 16;
        const chunkHeight = 16;
        chunkShape.moveTo(-offsetX, -offsetY);
        chunkShape.lineTo(-offsetX + chunkWidth, -offsetY);
        chunkShape.lineTo(-offsetX + chunkWidth, -offsetY + chunkHeight);
        chunkShape.lineTo(-offsetX, -offsetY + chunkHeight);
        chunkShape.lineTo(-offsetX, -offsetY);
        this.chunkMarker.setShape(chunkShape);
    }

    saveChunkInfo(coordinates) {
        const chunkX = Math.floor(coordinates.x / 16);
        const chunkY = Math.floor(coordinates.z / 16);
        const chunkName = `chunk_${chunkX}_${chunkY}`;
        // Calculate the median position of the shape's corners
        let medianX = 0;
        let medianZ = 0;
        const shape = [
            {x: chunkX * 16, z: chunkY * 16},
            {x: (chunkX + 1) * 16, z: chunkY * 16},
            {x: (chunkX + 1) * 16, z: (chunkY + 1) * 16},
            {x: chunkX * 16, z: (chunkY + 1) * 16}
        ];
        for (const corner of shape) {
            medianX += corner.x;
            medianZ += corner.z;
        }
        medianX /= shape.length;
        medianZ /= shape.length;

        const chunkInfo = {
            [chunkName]: {
                type: "shape",
                position: {x: medianX, y: 100.0, z: medianZ}, // Use median position
                label: "Example Shape Marker",
                shape: shape,
            }
        };
        console.log("Saving chunk info with coordinates:", coordinates);
        axios.post('http://localhost:3000/saveChunkInfo', chunkInfo)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error saving chunk info:', error);
            });
    }
}