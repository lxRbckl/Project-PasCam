# PasCam 2 by Alex Arbuckle #

import random, string, glob, datetime, time

# PasCam : Input #

def PasCam_Directory():
    '''  '''

    global PasCam_Directory

    PasCam_Directory = []
    for PasCam_File in glob.glob('*.txt'):

        PasCam_Directory.append(PasCam_File)


def PasCam_File(Input_Parameter):
    '''  '''

    if Input_Parameter == 1:

        while True:

            File_Input = PasCam_Input_A('website')
            File_Input += '.txt'

            if File_Input in PasCam_Directory:

                print('File already exists.\n')

            elif File_Input not in PasCam_Directory:

                return File_Input

    elif Input_Parameter == 2:

        while True:

            File_Input = PasCam_Input_A('website')
            File_Input += '.txt'

            if File_Input in PasCam_Directory:

                return File_Input

            elif File_Input not in PasCam_Directory:

                print('File does not exist.\n')

def PasCam_Menu():
    '''  '''

    while True:

        print('(1)\tEncrypt Information')
        print('(2)\tDecrypt Information')
        print('(3)\tUpdate Information')
        print('(4)\tPasCam Help Menu\n')

        Menu_List = ['1', '2', '3', '4']
        Menu_Input = input('Select a choice: ')
        print()

        if Menu_Input in Menu_List:

            return Menu_Input

        else:

            print('Input is invalid.\n')

def PasCam_Input_A(Input_Parameter):
    '''  '''

    while True:

        Input_Left = input('Enter {}: '.format(Input_Parameter))
        print()

        Input_String = ''
        for Input_Token in Input_Left:

            if Input_Token == ' ':

                Input_String += Input_Token

        if Input_String == '':

            if Input_Left == '':

                return

            else:

                Input_Right = input('Re-Enter {}: '.format(Input_Parameter))
                print()

                if Input_Left == Input_Right:

                    return Input_Left

                elif Input_Right == '':

                    return

                else:

                    print('The {}s do not match.\n'.format(Input_Parameter))

        elif Input_String != '':

            print('Spaces are not allowed. Try \'_\' or \'.\' instead.\n')

def PasCam_Input_B():
    '''  '''

    while True:

        print('(1) \tUsername\n\tPassword\n')
        print('(2) \tEmail\n\tUsername\n\tPassword\n')

        Input = input('Select a choice: ')
        print()

        if Input == '1':

            List_Input = ['username', 'password']

        elif Input == '2':

            List_Input = ['email', 'username', 'password']

        elif Input == '':

            return

        else:

            print('Input is invalid.\n')
            continue

        List_Output = []
        for List_Element in List_Input:

            Input = PasCam_Input_A(List_Element)
            List_Output.append(Input)

        return List_Output

def PasCam_Menu_Encrypt():
    '''  '''

    Encrypt_List = []
    Encrypt_Input = PasCam_File(1)
    Encrypt_List.append(Encrypt_Input)
    Encrypt_Input = PasCam_Input_B()
    for Encrypt_Element in Encrypt_Input:

        Encrypt_List.append(Encrypt_Element)

    return Encrypt_List

def PasCam_Menu_Decrypt():
    '''  '''

    Decrypt_Input = PasCam_File(2)
    return Decrypt_Input

def PasCam_Menu_Update():
    '''  '''

    Update_List = []
    Update_Input = PasCam_File(2)
    Update_List.append(Update_Input)
    Update_Input = PasCam_Input_B()
    for Update_Element in Update_Input:

        Update_List.append(Update_Element)

    return Update_List

def PasCam_Camouflage_A(Input_Parameter):
    ''' [ Input : an integer] [ Output : a random string ] '''

    Camouflage_String = ''
    Camouflage_Digits = list(string.digits)
    Camouflage_Symbols = list(string.punctuation)
    Camouflage_Letters = list(string.ascii_letters)
    del Camouflage_Symbols[23]
    while Input_Parameter > 0:

        Camouflage_Token = random.choice(Camouflage_Digits + Camouflage_Symbols + Camouflage_Letters)
        Camouflage_String += Camouflage_Token
        Input_Parameter -= 1

    return Camouflage_String

def PasCam_Camouflage_B(Input_Parameter):
    ''' [ Input : a string ] [ Output : a random list ] '''

    Camouflage_List = []
    Camouflage_Count_A = 1500
    Camouflage_Count_B = 3000
    for Input_Element in Input_Parameter:

        Camouflage_Token = random.randint(Camouflage_Count_A, Camouflage_Count_B)
        Camouflage_List.append(Camouflage_Token)
        Camouflage_Count_A = Camouflage_Count_B + 50
        Camouflage_Count_B = Camouflage_Count_B + 1450

    return Camouflage_List

def PasCam_Encrypt(Input_Parameter):
    ''' [ Input : an input list ] [ Output : encrypted input ] '''

    Encrypt_String_A = ''
    Input_Parameter.append(Security_List[2])
    for Input_Element in Input_Parameter[1:]:

        for Input_Token in Input_Element:

            Encrypt_String_A += Input_Token

        Encrypt_String_A += random.choice(['g[ZJ$L', 'u8a98R'])

    Encrypt_List_A = []
    Encrypt_Count_A = 0
    Encrypt_Count_B = 0
    Encrypt_String_B = ''
    Encrypt_List_B = PasCam_Camouflage_B(Encrypt_String_A)
    Encrypt_String_C = PasCam_Camouflage_A(2323 * len(Encrypt_String_A))
    for Encrypt_Token in Encrypt_String_C:

        if Encrypt_List_B == [] or Encrypt_Count_A != Encrypt_List_B[0]:

            Encrypt_String_B += Encrypt_Token
            Encrypt_Count_A += 1

        elif Encrypt_Count_A == Encrypt_List_B[0]:

            Encrypt_String_B += Encrypt_String_A[Encrypt_Count_B]
            Encrypt_List_A.append(Encrypt_List_B[0])
            del Encrypt_List_B[0]
            Encrypt_Count_A += 1
            Encrypt_Count_B += 1

    Encrypt_Count_C = 0
    Encrypt_String_D = ''
    Encrypt_List_C = [50, 100, 150, 200]
    for Encrypt_Token in Encrypt_String_B:

        if Encrypt_Count_C == Encrypt_List_C[3]:

            Encrypt_String_D += '{}\n'.format(Encrypt_Token)
            Encrypt_Count_C = 0

        elif Encrypt_Count_C in Encrypt_List_C:

            Encrypt_String_D += '{}{}'.format(Encrypt_Token, ' ' * 10)
            Encrypt_Count_C += 1

        elif Encrypt_Count_C not in Encrypt_List_C:

            Encrypt_String_D += '{}'.format(Encrypt_Token, end='')
            Encrypt_Count_C += 1

    Encrypt_List_D = []
    for Encrypt_Integer in Encrypt_List_A:

        Encrypt_Count_D = 0
        Encrypt_Count_D += 2
        Encrypt_Integer *= Encrypt_Count_D
        Encrypt_Count_D += 4
        Encrypt_Integer *= Encrypt_Count_D
        Encrypt_List_D.append(str(Encrypt_Integer))

    while True:

        try:

            Encrypt_String_E = PasCam_Camouflage_A(6)
            with open('{}.txt'.format(Encrypt_String_E), 'w') as Encrypt_File:

                Encrypt_File.write(Encrypt_String_D)

            Encrypt_String_F = PasCam_Camouflage_A(6)
            with open('{}.txt'.format(Encrypt_String_F), 'w') as Encrypt_File:

                for Encrypt_String in reversed(Encrypt_List_D):

                    Encrypt_String = random.choice(Encrypt_List_D)
                    Encrypt_File.write('{}\n'.format(Encrypt_String))
                    Encrypt_List_D.remove(Encrypt_String)

            break

        except FileNotFoundError:

            continue

    Encrypt_Count_E = 0
    Encrypt_Count_F = 0
    Encrypt_String_H = ''
    Encrypt_String_J = ''
    Encrypt_String_H += Encrypt_String_E
    Encrypt_String_H += Encrypt_String_F
    Encrypt_List_E = [2844, 3417, 4557, 6052, 8980, 9383, 11138, 12383, 14790, 15577, 16666, 18770]
    Encrypt_String_I = PasCam_Camouflage_A(2323 * len(Encrypt_List_E))
    for Encrypt_Token in Encrypt_String_I:

        if Encrypt_List_E == [] or Encrypt_Count_E != Encrypt_List_E[0]:

            Encrypt_String_J += Encrypt_Token
            Encrypt_Count_E += 1

        elif Encrypt_Count_E == Encrypt_List_E[0]:

            Encrypt_String_J += Encrypt_String_H[Encrypt_Count_F]
            del Encrypt_List_E[0]
            Encrypt_Count_E += 1
            Encrypt_Count_F += 1

    Encrypt_Count_G = 0
    Encrypt_String_K = ''
    Encrypt_List_F = [50, 100, 150, 200]
    for Encrypt_Token in Encrypt_String_J:

        if Encrypt_Count_G == Encrypt_List_F[3]:

            Encrypt_String_K += '{}\n'.format(Encrypt_Token)
            Encrypt_Count_G = 0

        elif Encrypt_Count_G in Encrypt_List_F:

            Encrypt_String_K += '{}{}'.format(Encrypt_Token, ' ' * 10)
            Encrypt_Count_G += 1

        elif Encrypt_Count_G not in Encrypt_List_F:

            Encrypt_String_K += '{}'.format(Encrypt_Token, end='')
            Encrypt_Count_G += 1

    with open('{}'.format(Input_Parameter[0]), 'w') as Encrypt_File:

        Encrypt_File.write(Encrypt_String_K)

    PasCam_Directory.append(Input_Parameter[0])

def PasCam_Decrypt(Input_Parameter_A, Input_Parameter_B):
    ''' [ Input : a string ] [ Output : decrypted input ] '''

    Encrypt_String_A = ''
    with open(Input_Parameter_A, 'r') as Encrypt_File:

        for Encrypt_Line in Encrypt_File:

            Encrypt_Line = Encrypt_Line.strip('\n')
            for Encrypt_Token in Encrypt_Line:

                if Encrypt_Token != ' ':

                    Encrypt_String_A += Encrypt_Token

    Encrypt_Count_A = 0
    Encrypt_String_B = ''
    Encrypt_List_A = [2844, 3417, 4557, 6052, 8980, 9383, 11138, 12383, 14790, 15577, 16666, 18770]
    for Encrypt_Token in Encrypt_String_A:

        if Encrypt_List_A == [] or Encrypt_Count_A != Encrypt_List_A[0]:

            Encrypt_Count_A += 1

        elif Encrypt_Count_A == Encrypt_List_A[0]:

            Encrypt_String_B += Encrypt_Token
            del Encrypt_List_A[0]
            Encrypt_Count_A += 1

    Encrypt_String_C = ''
    with open('{}.txt'.format(Encrypt_String_B[0:6]), 'r') as Encrypt_File:

        for Encrypt_Line in Encrypt_File:

            Encrypt_Line = Encrypt_Line.strip('\n')
            for Encrypt_Token in Encrypt_Line:

                if Encrypt_Token != ' ':

                    Encrypt_String_C += Encrypt_Token

    Encrypt_List_B = []
    with open('{}.txt'.format(Encrypt_String_B[6:12]), 'r') as Encrypt_File:

        for Encrypt_Integer in Encrypt_File:

            Encrypt_Integer = Encrypt_Integer.strip('\n')
            Encrypt_Integer = int(Encrypt_Integer)
            Encrypt_List_B.append(Encrypt_Integer)

    Encrypt_List_C = []
    while True:

        if Encrypt_List_B == []:

            break

        else:

            Encrypt_Token = min(Encrypt_List_B)
            Encrypt_List_C.append(Encrypt_Token)
            Encrypt_List_B.remove(Encrypt_Token)

    Encrypt_List_D = []
    for Encrypt_Integer in Encrypt_List_C:

        Encrypt_Count_B = 0
        Encrypt_Count_B += 2
        Encrypt_Integer /= Encrypt_Count_B
        Encrypt_Count_B += 4
        Encrypt_Integer /= Encrypt_Count_B
        Encrypt_List_D.append(int(Encrypt_Integer))

    Encrypt_Count_C = 0
    Encrypt_List_E = ''
    for Encrypt_Token in Encrypt_String_C:

        if Encrypt_List_D == [] or Encrypt_Count_C != Encrypt_List_D[0]:

            Encrypt_Count_C += 1

        elif Encrypt_Count_C == Encrypt_List_D[0]:

            Encrypt_List_E += Encrypt_Token
            del Encrypt_List_D[0]
            Encrypt_Count_C += 1

    Encrypt_List_E = Encrypt_List_E[:-6]
    Encrypt_List_E = Encrypt_List_E.replace('g[ZJ$L', ' ').replace('u8a98R', ' ')
    Encrypt_List_E = Encrypt_List_E.split(' ')

    if Input_Parameter_B == 1:

        if Encrypt_List_E[-1] == Security_List[2]:

            if len(Encrypt_List_E) == 3:

                print('Username:\t{}\nPassword:\t{}\n'.format(Encrypt_List_E[0], Encrypt_List_E[1]))

            elif len(Encrypt_List_E) == 4:

                print('Email:\t\t{}\nUsername:\t{}\nPassword:\t{}\n'.format(Encrypt_List_E[0], Encrypt_List_E[1], Encrypt_List_E[2]))

        elif Encrypt_List_E[-1] != Security_List[2]:

            print('File tag does not match. File was deleted for security purposes.\n')

    elif Input_Parameter_B == 2:

            return Encrypt_List_E

def PasCam_Security():
    ''' [ Input : N/A ] [ Output : list of security information ] '''

    global Security_List

    while True:

        if 'PasCam.txt' in PasCam_Directory:

            Security_Count = 0
            Security_List = PasCam_Decrypt('PasCam.txt', 2)
            while Security_Count < 5:

                Security_Variable = input('Password: ')
                print()

                if Security_Variable == Security_List[0]:

                    with open('Access Log.txt', 'a') as Security_File:

                        Security_File.write('{}\n'.format(datetime.date.today()))

                    print('Welcome back, {}.\n'.format(Security_List[1])), time.sleep(1)
                    return True

                elif Security_Variable != Security_List[0]:

                    print('Password entered was incorrect.\n')
                    Security_Count += 1

            return False

        elif 'PasCam.txt' not in PasCam_Directory:

            Security_List = []
            Security_List.append('PasCam.txt')
            print('Welcome to PasCam. Let\'s get you started.\n'), time.sleep(1)
            print('Create a password for your PasCam that you will remember.')
            print('This will be the only password that you have to memorize.\n')
            Security_Variable = PasCam_Input_A('password')
            Security_List.append(Security_Variable)

            print('What should I call you?\n')
            Security_Variable = PasCam_Input_A('name')
            Security_List.append(Security_Variable)

            Security_Variable = PasCam_Camouflage_A(6)
            Security_List.append(Security_Variable)
            PasCam_Encrypt(Security_List)
            Security_List = PasCam_Decrypt('PasCam.txt', 2)

            with open('Access Log.txt', 'w') as Security_File:

                Security_File.write('{}\n'.format(datetime.date.today()))

            print('You\'re all set. Welcome to PasCam, {}.\n'.format(Security_List[1])), time.sleep(1)

            return True

def PasCam_Help_Menu():
    ''' [ Input : N/A ] [ Output : a help screen ] '''

    print(' - Encrypt Information means to input information you wish to hide.\n')
    print('\t - Must be a unique file name; you may not overwrite one that already exists.\n')
    print(' - Decrypt Information means to output information you wish to find.\n')
    print('\t - File must exist already in order to decrypt.\n')
    print(' - Update Information means to renew information that you\'ve hidden.\n')
    print('\t - File must already exist in order to update information.\n')
    print(' - You have the capability of returning to the menu simply by pressing enter.\n')
    print('\t - Input must be blank before exiting.\n')
    print(' - No spaces are allowed.\n')
    print(' - \'Username/Password\' : the information you wish to hide contains only a username and password\n')
    print(' - \'Email/Username/Password\' : the information you wish to hide contains only an email, username and password.\n')
    input('Press enter to return to the main menu.\n')

# PasCam : Output #

PasCam_Directory()
PasCam_Security = PasCam_Security()
if (PasCam_Security == True):

    while True:

        try:

            PasCam_Input = PasCam_Menu()

            if PasCam_Input == '1':

                PasCam_Input = PasCam_Menu_Encrypt()
                PasCam_Encrypt(PasCam_Input)
                time.sleep(0.5), print('Information encrypted.\n'), time.sleep(0.5)

            elif PasCam_Input == '2':

                PasCam_Input = PasCam_Menu_Decrypt()
                PasCam_Decrypt(PasCam_Input, 1)

            elif PasCam_Input == '3':

                PasCam_Input = PasCam_Menu_Update()
                PasCam_Encrypt(PasCam_Input)
                time.sleep(0.5), print('Information updated.\n'), time.sleep(0.5)

            elif PasCam_Input == '4':

                PasCam_Help_Menu()
                time.sleep(0.5)

            else:

                print('Input is invalid.\n')

        except TypeError:

            continue
