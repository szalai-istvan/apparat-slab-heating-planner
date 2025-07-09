class Blueprint {
    data;
    topLeftPosition;

    constructor(data, topLeftPosition) {
        this.data = data;
        this.topLeftPosition = topLeftPosition;

        if (!scaleContext.ratioIsSet()) {
            tooltip.fileUploadSuccessful(() => tooltip.fileIsUploaded());
        } else {
            tooltip.fileUploadSuccessful(() => {});
        }
    }
}