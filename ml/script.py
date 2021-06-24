from PIL import Image
from math import *
import numpy as np
import matplotlib.pyplot as plt
import pickle
import cv2
import glob
import os
import csv

def initCsv(filename):
    print("init csv : " + filename + ".csv")
    with open(filename+'.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')


def csvWriter(filename, nparray, desired):
    lines = nparray.tolist()
    data = []
    for i in lines:
        for j in i:
            data.append(j)
    # print(f"pixel count : {len(data)}")
    with open(filename+'.csv', 'a', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        data.append(desired)
        print(desired)
        writer.writerow(data)

def resizer(pictureArray, pathFrom, pathDestination, desired):
    for i in pictureArray:
        print(f"{i}")
        image = cv2.imread(f"{pathFrom}{i}", 0) #0 -> Using 0 to read image in grayscale mode
        if image is None:
            print(f"Image {i} not read")
            continue
        res = cv2.resize(image, (50,50), interpolation=cv2.INTER_LINEAR)
        cv2.imwrite(f"{pathDestination}{i}", res, [cv2.IMWRITE_JPEG_QUALITY, 100])
        img = np.array(res)
        files.append([img, desired])


if __name__ == "__main__":

    path = "./ml/"
    csvName = "shot"
    initCsv(path+csvName)
    files = []
    # print(os.getcwd())
    shot = os.listdir(path+"_shot_id")
    
    resizer(shot, path+"_shot_id/", path+"_resized_shot_id/", 999)

    for file in files:
        csvWriter(path+csvName, file[0], file[1])

    # print(shot)
    print(f"__SHOT__")
    f_shot = open(path+"shot.csv")
    data_shot = np.loadtxt(f_shot, delimiter=',')
    inputs_shot = data_shot[:, :-1]
    desired_shot = data_shot[:, -1]
    inputs_shot /= 255.0

    file = open(path+"id_card_model_94.mlp", 'rb')
    model = pickle.load(file)
    file.close()

    test_shot = model.predict(inputs_shot)
    print(test_shot[2:])
    for image in shot:
        if(image != "id.jpeg" and image != "no id.jpeg"):
            os.remove(path+"_shot_id/"+image)
            os.remove(path+"_resized_shot_id/"+image)

    # print(shot)
