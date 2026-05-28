// dicomParserUtil.js
import dicomParser from "dicom-parser";

/**
 * Fetches a DICOM file and parses its core metadata into a structured object.
 * @param {string} fileUrl - The path to the public DICOM file
 * @returns {Promise<Object>} Cleanly mapped DICOM metadata entries
 */
export const getDicomInfo = async(fileUrl) => {
    const response = await fetch(fileUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch DICOM file: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const dataSet = dicomParser.parseDicom(new Uint8Array(buffer));

    // Extract number of frames safely
    const framesRaw = dataSet.intString("x00280008");
    const actualFrames = framesRaw !== undefined ? parseInt(framesRaw, 10) : 1;

    // Return the runtime object structure
    return {
        patientName: {
            label: "Patient Name",
            value: dataSet.string("x00100010") ?? "N/A"
        },
        patientId: {
            label: "Patient ID",
            value: dataSet.string("x00100020") ?? "N/A"
        },
        modality: {
            label: "Modality",
            value: dataSet.string("x00080060") ?? "N/A"
        },
        rows: {
            label: "Rows",
            value: dataSet.uint16("x00280010") ?? "N/A"
        },
        columns: {
            label: "Columns",
            value: dataSet.uint16("x00280011") ?? "N/A"
        },
        totalFrames: {
            label: "Total Frames",
            value: actualFrames
        },
    };
};