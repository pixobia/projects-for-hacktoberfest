import pytesseract as tess
tess.pytesseract.tesseract_cmd=r'C:\Program Files\Tesseract-OCR\tesseract.exe' #Check and Add your path here
import cv2
import numpy as np 
from pyzbar.pyzbar import decode

#img= cv2.imread('1.jpg')
#code=decode(img)
cap = cv2.VideoCapture(1)

cap.set(3,640)
cap.set(4,480)


def reader(img):
    for barcode in decode(img):
        barvalue= barcode.data.decode('utf-8')
        print(barvalue)
        print('\a')
    
def main():
    while True:
        success, img = cap.read()
        reader(img)
        cv2.imshow('Result',img)
        if cv2.waitKey(1)==ord('q'):
          break
        cap.release()
        cv2.destroyAllWindows()   

if __name__=="__main__":
    main()
