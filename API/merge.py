import random
import numpy as np
import matplotlib.pyplot as plt
def mergeSort(vector):  
    global contador  
    if len(vector)>1:
        mitad = len(vector)//2
        mitadIzquierda = vector[:mitad]
        mitadDerecha = vector[mitad:]

        mergeSort(mitadIzquierda)
        mergeSort(mitadDerecha)

        i=0
        j=0
        k=0
        while i < len(mitadIzquierda) and j < len(mitadDerecha):
            if mitadIzquierda[i] <= mitadDerecha[j]:
                vector[k]=mitadIzquierda[i]
                i=i+1
                contador=contador+1
            else:
                vector[k]=mitadDerecha[j]
                j=j+1
                contador = contador+1
            k=k+1

        while i < len(mitadIzquierda):
            vector[k]=mitadIzquierda[i]
            i=i+1
            k=k+1

        while j < len(mitadDerecha):
            vector[k]=mitadDerecha[j]
            j=j+1
            k=k+1


numeroComparacionesPorCiclo=[]

for j in range(20):
    vector = []
    for i in range(j):
        vector.append(random.randrange(500))
    contador = 0
    mergeSort(vector)
    numeroComparacionesPorCiclo.append(contador)

plt.plot(pendiente)
plt.show()
