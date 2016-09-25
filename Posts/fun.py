import sys
import os


dirs = os.listdir("./")
iOSsc = 0
samsc = 0
messc = 0
activeTags = ""


for fil in dirs:
	if fil.endswith(".txt"):
		if fil != "output.txt" :
			#print(fil)
			t = open(fil,'r').read().split('\n')
			#judgea inte mina 6 if satser
			iOSsc = iOSsc +  int(t[3]) * int(t[2])
			messc = messc +  int(t[4]) * int(t[2])
			samsc = samsc +  int(t[5]) * int(t[2])

			activeTags += t[0] + ","

result = activeTags + "\n" + str(iOSsc) + "\n" + str(samsc)+ "\n" + str(messc) + "\n"
print(result)

ff = open('output.txt','w')
ff.write(result)