#rock-paper-scissors program

import random
u_wins=0
systemwins=0
L=["rock","paper","scissors"]
while True:
    u_input=input("Type Rock/Paper/Scissors or Q to quit: ").lower()
    if u_input=='q':
        break
    if u_input not in L:
        continue
    num=random.randint(0,2)
    var=L[num]
    print("computer picked",var)
    if u_input=="rock" and var=="scissors":
        print("You won!!!")
        u_wins+=1
        
    elif u_input=="paper" and var=="rock":
        print("You won!!!")
        u_wins+=1
        
    elif u_input=="scissors" and var=="paper":
        print("You won!!!")
        u_wins+=1
    elif u_input==var:
        print("Draw!!!")
          
    else:
        print("You lose!!!")
        systemwins+=1
        
print("Thank you for playing")
print("you won",u_wins,"times")
print("computer won",systemwins,"times")
    
