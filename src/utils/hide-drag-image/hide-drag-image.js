export default function hideDragImage(dataTransfer) {
  const emptyImg = new Image();
  dataTransfer.setDragImage(emptyImg, 0, 0);
}
