# PasCam by Alex Arbuckle #

import random, string, glob, datetime, time, pyperclip

# PasCam : Input #

def PasCam_Directory():
    ''' [ Input : ] [ Output : ] '''

    global Directory_List

    Directory_List = [PasCam_File[:-4] for PasCam_File in glob.glob('*.txt')]
    Directory_List = [PasCam_File for PasCam_File in Directory_List if PasCam_File.endswith('0') == False]

def PasCam_Menu():
    ''' [ Input : ] [ Output : ] '''

    while True:

        for Menu_Count, Menu_Element in enumerate(['Encrypt Information', 'Decrypt Information', 'Update Information', 'Help Menu', 'My Accounts'], start = 1):

            print('({})\t{}'.format(Menu_Count, Menu_Element))

        Menu_Input = input('\nInput:\t')
        print()

        if Menu_Input in ['1', '2', '3', '4', '5']:

            return Menu_Input

        else:

            print('Input is invalid.\n')

def PasCam_Input(Input_Parameter):
    ''' [ Input : ] [ Output : ] '''

    def Input_Function(Input_Parameter):
        ''' [ Input : ] [ Output : ] '''

        Input_List = []
        for Input_Element in Input_Parameter:

            while True:

                Input_Left = input('Enter {}: '.format(Input_Element))
                print()

                if len(Input_Left) == 0:

                    return

                Input_Right = input('Re-Enter {}: '.format(Input_Element))
                print()

                if len(Input_Right) == 0:

                    return

                elif Input_Left == Input_Right:

                    Input_List.append(Input_Left)
                    break

                else:

                    print('Input is invalid.\n')

        return Input_List

    if Input_Parameter == 'FireWall_Encrypt':

        Input_Name, Input_Password = Input_Function(['Password', 'Your Name'])
        return [Input_Element for Input_Element in ['PasCam', Input_Name, Input_Password, PasCam_String(6)]]

    elif Input_Parameter == 'FireWall_Decrypt':

        return 'PasCam'

    else:

        while True:

            Input_A = input('Enter Website:\t')
            print()

            if len(Input_A) == 0:

                return

            elif Input_Parameter == 'Encrypt':

                if Input_A in Directory_List:

                    print('File already exists.\n')

                else:

                    break

            elif Input_Parameter == 'Decrypt':

                if Input_A not in Directory_List:

                    print('File does not exist.\n')

                else:

                    return Input_A

            elif Input_Parameter == 'Update':

                if Input_A not in Directory_List:

                    print('File does not exist.\n')

                else:

                    break

        while True:

            Input_B = input('1.\tUsername\n\tPassword\n\n2.\tEmail\n\tUsername\n\tPassword\n\nInput:\t')
            print()

            if len(Input_B) == 0:

                return

            elif Input_B == '1':

                Input_List = Input_Function(['Username', 'Password'])
                return [Input_Element for Input_Element in [Input_A, Input_List[0], Input_List[1], FireWall_Code]]

            elif Input_B == '2':

                Input_List = Input_Function(['Email', 'Username', 'Password'])
                return [Input_Element for Input_Element in [Input_A, Input_List[0], Input_List[1], Input_List[2], FireWall_Code]]

            else:

                print('Input is invalid.\n')

def PasCam_String(Input_Parameter):
    ''' [ Input : ] [ Output : ] '''

    return ''.join(random.choice(string.punctuation[:22] + string.punctuation[24:] + string.ascii_letters + string.digits) for String_Token in range(Input_Parameter))

def PasCam_List(Input_Parameter):
    ''' [ Input : ] [ Output : ] '''

    while True:

        List = [random.randint(3125, 36875) for Input_Element in Input_Parameter]

        for Element in List:

            if List.count(Element) > 1:

                continue

        return sorted(List)

def PasCam_Encrypt(Input_Parameter):
    ''' [ Input : ] [ Output : ] '''

    Encrypt_List_A = PasCam_Input(Input_Parameter)
    while True:

        try:

            Encrypt_File_A = PasCam_String(5)
            Directory_List.append(Encrypt_List_A[0])
            Encrypt_String_A = '/'.join(Encrypt_List_A[1:])
            Encrypt_String_B = PasCam_String(len(Encrypt_String_A) * 5000)
            for Encrypt_Count, Encrypt_Element in enumerate([924, 1328, 1908, 2752, 3004]):

                Encrypt_String_B = '{}{}{}'.format(Encrypt_String_B[:(Encrypt_Element - 1)], Encrypt_File_A[Encrypt_Count], Encrypt_String_B[(Encrypt_Element + 1):])

            Encrypt_List_B = PasCam_List(Encrypt_String_A)
            for Encrypt_Count, Encrypt_Token in enumerate(Encrypt_String_A):

                Encrypt_String_B = '{}{}{}'.format(Encrypt_String_B[:(Encrypt_List_B[Encrypt_Count] - 1)], Encrypt_Token, Encrypt_String_B[(Encrypt_List_B[Encrypt_Count] + 1):])

            Encrypt_Count_A = 0
            Encrypt_String_C = ''
            for Encrypt_Token in Encrypt_String_B:

                if Encrypt_Count_A in [0]:

                    Encrypt_String_C += '\t{}'.format(Encrypt_Token)
                    Encrypt_Count_A += 1

                elif Encrypt_Count_A in [50, 100, 150]:

                    Encrypt_String_C += '\t{}'.format(Encrypt_Token)
                    Encrypt_Count_A += 1

                elif Encrypt_Count_A in [200]:

                    Encrypt_String_C += '{}\n'.format(Encrypt_Token)
                    Encrypt_Count_A = 0

                elif Encrypt_Count_A not in [50, 100, 150, 200]:

                    Encrypt_String_C += Encrypt_Token
                    Encrypt_Count_A += 1

            Encrypt_List_C = [((5 * (6 + (5 * (6 + Encrypt_Element))))) for Encrypt_Element in Encrypt_List_B]
            random.shuffle(Encrypt_List_C)
            Encrypt_String_D = ''.join('{}\n'.format(str(Encrypt_Element)) for Encrypt_Element in Encrypt_List_C)
            for Encrypt_Count, Encrypt_Element in enumerate((Encrypt_List_A[0], Encrypt_File_A), start = 1):

                if Encrypt_Count == 1:

                    with open('{}.txt'.format(Encrypt_Element), 'w') as Encrypt_File:

                        Encrypt_File.write(Encrypt_String_C)

                elif Encrypt_Count == 2:

                    with open('{}0.txt'.format(Encrypt_Element), 'w') as Encrypt_File:

                        Encrypt_File.write(Encrypt_String_D)

            break

        except FileNotFoundError:

            continue

def PasCam_Decrypt(Input_Parameter):
    ''' [ Input : ] [ Output : ] '''

    Decrypt_Variable = PasCam_Input(Input_Parameter)
    for Decrypt_Count, Decrypt_Element in enumerate(['', '', ''], start = 1):

        if Decrypt_Count == 1:

            with open('{}.txt'.format(Decrypt_Variable), 'r') as Decrypt_File:

                Decrypt_String_A = ''.join(Decrypt_Line.replace('\n', '').replace('\t', '') for Decrypt_Line in Decrypt_File)
                Decrypt_String_A = ''.join(Decrypt_Token for Decrypt_Line in Decrypt_String_A for Decrypt_Token in Decrypt_Line)
                Decrypt_String_B = ''.join(Decrypt_String_A[Decrypt_Element - 1] for Decrypt_Element in [924, 1328, 1908, 2752, 3004])

        elif Decrypt_Count == 2:

            with open('{}0.txt'.format(Decrypt_String_B), 'r') as Decrypt_File:

                Decrypt_List = sorted([int(Decrypt_Line.strip()) for Decrypt_Line in Decrypt_File])
                Decrypt_List = [int((((((Decrypt_Element - 6) / 5) - 6) / 5) - 5)) for Decrypt_Element in Decrypt_List]

        elif Decrypt_Count == 3:

            with open('{}.txt'.format(Decrypt_Variable), 'r') as Decrypt_File:

                Decrypt_String_C = ''.join(Decrypt_String_A[Decrypt_Element - 1] for Decrypt_Element in Decrypt_List)
                Decrypt_List = Decrypt_String_C.split('/')

                if Input_Parameter != 'FireWall_Decrypt':

                    if len(Decrypt_List) == 3:

                        if Decrypt_List[2] == FireWall_Code:

                            pyperclip.copy(Decrypt_List[1])
                            print('Username:\t{}\nPassword:\t{}\n'.format(Decrypt_List[0], Decrypt_List[1]))

                        else:

                            print('PasCam security codes do not match.')

                    elif len(Decrypt_List) == 4:

                        if Decrypt_List[3] == FireWall_Code:

                            pyperclip.copy(Decrypt_List[2])
                            print('Email:\t\t{}\nUsername:\t{}\nPassword:\t{}\n'.format(Decrypt_List[0], Decrypt_List[1], Decrypt_List[2]))

                        else:

                            print('PasCam security codes do not match.')

                return Decrypt_List

def PasCam_FireWall():
    ''' [ Input : ] [ Output : ] '''

    global FireWall_Code

    if 'PasCam' in Directory_List:

        while True:

            try:

                FireWall_Count = 3
                FireWall_Password, FireWall_Name, FireWall_Code = PasCam_Decrypt('FireWall_Decrypt')
                while True:

                    FireWall_Input = input('Password:\t')
                    print()

                    if FireWall_Count == 0:

                        with open('Access_Log0.txt', 'a') as FireWall_File:

                            FireWall_File.write('{}\t\t\tUnsuccessful\n'.format(datetime.datetime.now()))

                        return False

                    elif FireWall_Input == FireWall_Password:

                        print('Welcome back, {}.\n'.format(FireWall_Name))
                        with open('Access_Log0.txt', 'a') as FireWall_File:

                            FireWall_File.write('{}\t\tSuccessful\n'.format(datetime.datetime.now()))

                        return True

                    elif FireWall_Input != FireWall_Password:

                        print('Password was incorrect.\n')
                        FireWall_Count -= 1

            except ValueError:

                continue

    elif 'PasCam' not in Directory_List:

        print('Welcome to PasCam.'), time.sleep(1.2), print('Enter a password that you will remember for your personal PasCam.'), time.sleep(1.4)
        print('This will be the only password you will need to remember.\n'), time.sleep(1.6)

        PasCam_Encrypt('FireWall_Encrypt')
        while True:

            try:

                FireWall_Password, FireWall_Name, FireWall_Code = PasCam_Decrypt('FireWall_Decrypt')

                print('Welcome to PasCam, {}.\n'.format(FireWall_Name))
                with open('Access_Log0.txt', 'w') as FireWall_File:

                    FireWall_File.write('{}\tCreated\n'.format(datetime.datetime.now()))

                return True

            except ValueError:

                continue

# PasCam : Output #

PasCam_Directory()
Login = PasCam_FireWall()

if (Login == True):

    while True:

        try:

            time.sleep(1.2)
            Input = input('{:^25s}\n\n{}\n{}\n{}\n\n{}\n{}\n\nInput:\t'.format('PasCam Menu', '1.\tEncrypt Information', '2.\tDecrypt Information', '3.\tUpdate Information', '4.\tMy Websites', '5.\tHelp'))
            print()

            if Input == '1':

                PasCam_Encrypt('Encrypt')

            elif Input == '2':

                PasCam_Decrypt('Decrypt')

            elif Input == '3':

                PasCam_Encrypt('Update')

            elif Input == '4':

                [print('%s.\t%s' % (Directory_Count, Directory_Element)) for Directory_Count, Directory_Element in enumerate(Directory_List, start = 1) if Directory_Element != 'PasCam'], input()

            elif Input == '5':

                input('< Encrypt Information : scramble information >\n< Decrypt Information : unscramble information >\n< Update Information : change then scramble information >\n\n< Press ENTER to exit to PasCam Menu >\n')

            else:

                print('Input is invalid.\n')

        except TypeError:

            continue

        except FileNotFoundError:

            continue
