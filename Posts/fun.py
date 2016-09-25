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
			if   t[3] == "M" :
				messc = messc +  2 * int(t[2])
			elif t[3] == "A" :
				iOSsc = iOSsc +  2 * int(t[2])
			else :
				samsc = samsc +  2 * int(t[2])

			if   t[4] == "M" :
				messc = messc + int(t[2])
			elif t[4] == "A" :
				iOSsc = iOSsc + int(t[2])
			else :
				samsc = samsc + int(t[2])

			activeTags += t[0] + ","

result = activeTags + "\n" + str(iOSsc) + "\n" + str(samsc)+ "\n" + str(messc) + "\n"
print(result)

ff = open('output.txt','w')
ff.write(result)