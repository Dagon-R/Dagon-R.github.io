#include <iostream>
#include <string>
#include <random>

using namespace std;

//These are function declarations, which I've kinda sorta talked about. The actual functions definitions are below the main code, so scroll down for those.

bool key3();
bool key4();
bool key5();
bool key6();
bool key7();
bool key8();

//???
bool backupflag = true;
//???

//Global Variables
int inputInt = 0;
string inputString = "";

int main()
{
    //These are Boolean flags, which can be either 'true' or 'false'
    //A "flag" is a prgramming for something that signals an event (like a checkered flag in a race)
    //You are allowed to change these values to true if you don't want to have to enter the first solution every time you test.
    bool flag1 = false;
    bool flag2 = false;
    bool flag3 = false;
    bool flag4 = false;
    bool flag5 = false;
    bool flag6 = false;
    bool flag7 = false;
    bool flag8 = false;
    srand(time(NULL));
    
    while(1){
        if(flag1 == false){
            cout << "Enter bomb code #1:";
            cin >> inputInt;
            if(inputInt == 5){
                cout << endl << "Code accepted!" << endl;
                flag1 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        else if(flag2 == false){
            cout << "Enter bomb code #2:";
            cin >> inputInt;
            int a = 2;
            int b = 3;
            int c = b + inputInt + a + b;
            if(c == 20){
                cout << endl << "Code accepted!" << endl;
                flag2 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        //from here on down, all keys will use functions for readability
        else if(flag3 == false){
            if(key3() == true){
                cout << endl << "Code accepted!" << endl;
                flag3 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        else if(flag4 == false){
            if(key4() == true){
                cout << endl << "Code accepted!" << endl;
                flag4 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        else if(flag5 == false){
            if(key5() == true){
                cout << endl << "Code accepted!" << endl;
                flag5 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        else if(flag6 == false){
            if(key6() == true){
                cout << endl << "Code accepted!" << endl;
                flag6 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        else if(flag7 == false){
            if(key7() == true){
                cout << endl << "Code accepted!" << endl;
                flag7 = true;
            }
            else{
                cout << endl << "Code rejected!" << endl;
            }
        }
        //EXTRA CREDIT
        else if(flag8 == false){
            if(key8() == true){
                cout << endl << "Backup code accepted!" << endl;
                flag8 = true;
            }
            else{
                cout << endl << "Backup code rejected!" << endl;
            }
        }
        else{
            
            cout << "All bomb codes have been entered, powering off..." << endl;
            break;
        }
        //This is just for spacing, don't worry about it
        cout << endl;
    }
    return 0;
}

bool key3(){
    cout << "Enter bomb code #3:";
    cin >> inputInt;
    int a = (inputInt * inputInt) + inputInt;
    if(a == 110){
        return true;
    }
    else{
        return false;
    }
}

bool key4(){
    cout << "Enter bomb code #4:";
    cin >> inputString;
    string code = "Don't " + inputString + " please!";
    if(code == "Don't explode please!"){
        return true;
    }
    else{
        return false;
    }
}

bool key5(){
    cout << "Enter bomb code #5:";
    cin >> inputInt;
    int r = rand();
    int code = r % inputInt;
    if(code == 0){
        return true;
    }
    else{
        return false;
    }
}

bool key6(){
    cout << "Enter bomb code #6:";
    cin >> inputInt;
    int i = 0;
    while(i <= inputInt){
        i++;
    }
    if(i == 7){
        return true;
    }
    else{
        return false;
    }
}
bool key7(){
    cout << "Enter bomb code #7:";
    cin >> inputInt;
    int i = 0;
    int counter = 1;
    while(i < inputInt){
        i++;
        counter = counter * i;
    }
    if(counter == 120){
        return true;
    }
    else{
        return false;
    }
}
//EXTRA CREDIT, BUT I KNOW YOU GUYS CAN FIGURE IT OUT!
bool key8(){
    if(backupflag){
        cout << endl << endl << "//////////////////////////////////////////////////////////////////////////////" << endl << endl;
        cout << "        BOMB DEFUSED, SWITCHING TO BACKUP SYSTEMS";
        cout << endl << endl << "//////////////////////////////////////////////////////////////////////////////" << endl << endl;
        backupflag = false;
    }
    cout << "Enter backup code #1:";
    cin >> inputInt;
    cout << "Enter backup code #2:";
    cin >> inputString;
    int max = inputString.length();
    int counter = 0;
    int i = 0;
    int j = 0;
    while(i < inputInt){
        i++;
        j = 0;
        while(j < max){
            j++;
            counter++;
        }
        
    }
    if(counter == 100){
        return true;
    }
    else{
        return false;
    }
}