# PasCam 1 by Alex Arbuckle #

# PasCam Imports #
import string, random, datetime

# PasCam Functions #
def PasCam_Camouflage(input_length):
    ''' generates random string '''
    global PasCam_Generated_String

    PasCam_Generated_String = (''.join([random.choice(string.ascii_letters + string.digits) for _Camouflage_Token in range(input_length)]))
    return PasCam_Generated_String

def PasCam_Menu():
    ''' returns option '''
    global Menu_Option

    available = ['1', '2', '3', '1.', '2.', '3.']

    while True:
        print('1. Encode Information')
        print('2. Decode Information')
        print('3. Revise Information')
        print()

        Menu_Option = input('Enter the desired task: ')
        print()

        if Menu_Option in available:

            return Menu_Option

        else:
            print('Please enter one of the given options.')
            print()

def PasCam_Encode():
    ''' returns option '''
    global Encode_Option

    available = ['1', '2', '1.', '2.']

    while True:
        print('1. Username/Password')
        print('2. Email/Username/Password')
        print()

        Encode_Option = input('Enter the desired task: ')
        print()

        if Encode_Option in available:

            return Encode_Option

        else:
            print('Please enter one of the given options.')
            print()

def PasCam_Decode():
    ''' returns option '''
    global input_find, input_count

    while True:

        input_find = input('Enter the name of the website: ')
        print()

        try:
            with open(input_find, 'r') as input_open:
                input_count = 0

                for line in input_open:
                    for token in line:
                        input_count += 1

            return input_find, input_count

        except:
            print('PasCam was unable to find the file. Please try again.')
            print()

def PasCam_Input1(PasCam_Input):
    ''' Encrypt 1 of 2 '''
    global _input, input_length, input_file1

    while True:
        input_ = input('Enter the %s: ' % (PasCam_Input))
        _input = input('Enter the %s again: ' % (PasCam_Input))
        print()

        if input_ == _input:
            input_length = len(_input)

            input_file1 = PasCam_Camouflage(5)
            with open(input_file1, 'w') as input_open:
                count = 0
                n = 24
                i = 154

                while count < input_length:
                    number = (random.randint(n, i))
                    input_open.write('%s\n' % (number))
                    n = i + 1
                    i = i + 120
                    count += 1

            return _input, input_length, input_file1

        else:
            print('The %ss do not match. Please try again.' % (PasCam_Input))
            print()

def PasCam_Input2(_input, input_length, input_file1):
    ''' Encrypt 2 of 2 '''
    global input_file2

    input_available = []
    with open(input_file1, 'r') as input_open1:

        for input_number in input_open1:
            input_available.append(int(input_number.strip()))

    input_file2 = PasCam_Camouflage(5)
    with open(input_file2, 'w') as input_open2:
        input_camouflage = PasCam_Camouflage(5555)
        count = 0

        while input_length > 0:

            for input_token in input_camouflage:

                if count in input_available:
                    input_length -= 1
                    input_open2.write(_input[input_length])
                    count += 1

                elif count not in input_available:
                    input_open2.write(input_token)
                    count += 1

        input_open2.write(PasCam_Camouflage(5555))

    return input_file2

def PasCam_Encode1():
    ''' encodes username/password '''

    while True:

        website_ = input('Enter the website: ')
        _website = input('Enter the website again: ')
        print()

        if website_ == _website:

            with open(website_, 'w') as input_open:

                website_camouflage_beginning = PasCam_Camouflage(5555)
                input_open.write(website_camouflage_beginning)

                PasCam_Input1('username')
                input_open.write(input_file1)
                PasCam_Input2(_input, input_length, input_file1)
                input_open.write(input_file2)

                PasCam_Input1('password')
                input_open.write(input_file1)
                PasCam_Input2(_input, input_length, input_file1)
                input_open.write(input_file2)

                website_camouflage_end = PasCam_Camouflage(5555)
                input_open.write(website_camouflage_end)

                Encrypted_Success()

            return

        else:
            print('The websites do not match. Please try again.')
            print()

def PasCam_Encode2():
    ''' encodes email/username/password '''

    while True:

        website_ = input('Enter the website: ')
        _website = input('Enter the website again: ')
        print()

        if website_ == _website:

            with open(website_, 'w') as input_open:

                website_camouflage_beginning = PasCam_Camouflage(5555)
                input_open.write(website_camouflage_beginning)

                PasCam_Input1('email')
                input_open.write(input_file1)
                PasCam_Input2(_input, input_length, input_file1)
                input_open.write(input_file2)

                PasCam_Input1('username')
                input_open.write(input_file1)
                PasCam_Input2(_input, input_length, input_file1)
                input_open.write(input_file2)

                PasCam_Input1('password')
                input_open.write(input_file1)
                PasCam_Input2(_input, input_length, input_file1)
                input_open.write(input_file2)

                website_camouflage_end = PasCam_Camouflage(5555)
                input_open.write(website_camouflage_end)

                Encrypted_Success()

            return

        else:
            print('The websites do not match. Please try again.')
            print()

def PasCam_Decode1():
    ''' decodes username/password '''

    Username_DeCamo = [5556, 5557, 5558, 5559, 5560]
    Username_DeCamo_File = ''
    Username_Camo = [5561, 5562, 5563, 5564, 5565]
    Username_Camo_File = ''
    Password_DeCamo = [5566, 5567, 5568, 5569, 5570]
    Password_DeCamo_File = ''
    Password_Camo = [5571, 5572, 5573, 5574, 5575]
    Password_Camo_File = ''

    count_ = 1
    with open(input_find, 'r') as input_open:

        for line in input_open:
            for token in line:

                if count_ in Username_DeCamo:
                    Username_DeCamo_File += token
                    count_ += 1

                elif count_ in Username_Camo:
                    Username_Camo_File += token
                    count_ += 1

                elif count_ in Password_DeCamo:
                    Password_DeCamo_File += token
                    count_ += 1

                elif count_ in Password_Camo:
                    Password_Camo_File += token
                    count_ += 1

                else:
                    count_ += 1

    Username_Numbers_List = []
    with open(Username_DeCamo_File, 'r') as Username_Numbers_File:

        for token_ in Username_Numbers_File:
            Username_Numbers_List.append(int(token_))

    Username_Camouflage_Count = 0
    Username_Return = ''
    with open(Username_Camo_File, 'r') as Username_Camouflage_File:

        for _line in Username_Camouflage_File:
            for _token in _line:

                if Username_Camouflage_Count in Username_Numbers_List:
                    Username_Return += _token
                    Username_Camouflage_Count += 1

                else:
                    Username_Camouflage_Count += 1

    Password_Numbers_List = []
    with open(Password_DeCamo_File, 'r') as Password_Numbers_File:

        for token_ in Password_Numbers_File:
            Password_Numbers_List.append(int(token_))

    Password_Camouflage_Count = 0
    Password_Return = ''
    with open(Password_Camo_File, 'r') as Password_Camouflage_File:

        for _line in Password_Camouflage_File:
            for _token in _line:

                if Password_Camouflage_Count in Password_Numbers_List:
                    Password_Return += _token
                    Password_Camouflage_Count += 1

                else:
                    Password_Camouflage_Count += 1

    Decrypted_Success()

    print('Username: %s' % (Username_Return[::-1]))
    print('Password: %s' % (Password_Return[::-1]))
    print()

def PasCam_Decode2():
    ''' decodes email/username/password '''

    Email_DeCamo = [5556, 5557, 5558, 5559, 5560]
    Email_DeCamo_File = ''
    Email_Camo = [5561, 5562, 5563, 5564, 5565]
    Email_Camo_File = ''
    Username_DeCamo = [5566, 5567, 5568, 5569, 5570]
    Username_DeCamo_File = ''
    Username_Camo = [5571, 5572, 5573, 5574, 5575]
    Username_Camo_File = ''
    Password_DeCamo = [5576, 5577, 5578, 5579, 5580]
    Password_DeCamo_File = ''
    Password_Camo = [5581, 5582, 5583, 5584, 5585]
    Password_Camo_File = ''

    count_ = 1
    with open(input_find, 'r') as input_open:

        for line in input_open:
            for token in line:

                if count_ in Email_DeCamo:
                    Email_DeCamo_File += token
                    count_ += 1

                elif count_ in Email_Camo:
                    Email_Camo_File += token
                    count_ += 1

                elif count_ in Username_DeCamo:
                    Username_DeCamo_File += token
                    count_ += 1

                elif count_ in Username_Camo:
                    Username_Camo_File += token
                    count_ += 1

                elif count_ in Password_DeCamo:
                    Password_DeCamo_File += token
                    count_ += 1

                elif count_ in Password_Camo:
                    Password_Camo_File += token
                    count_ += 1

                else:
                    count_ += 1

    Email_Numbers_List = []
    with open(Email_DeCamo_File,'r') as Email_Numbers_File:

        for token_ in Email_Numbers_File:
            Email_Numbers_List.append(int(token_))

    Email_Camouflage_Count = 0
    Email_Return = ''
    with open(Email_Camo_File, 'r') as Email_Camouflage_File:

        for _line in Email_Camouflage_File:
            for _token in _line:

                if Email_Camouflage_Count in Email_Numbers_List:
                    Email_Return += _token
                    Email_Camouflage_Count += 1

                else:
                    Email_Camouflage_Count += 1

    Username_Numbers_List = []
    with open(Username_DeCamo_File, 'r') as Username_Numbers_File:

        for token_ in Username_Numbers_File:
            Username_Numbers_List.append(int(token_))

    Username_Camouflage_Count = 0
    Username_Return = ''
    with open(Username_Camo_File, 'r') as Username_Camouflage_File:

        for _line in Username_Camouflage_File:
            for _token in _line:

                if Username_Camouflage_Count in Username_Numbers_List:
                    Username_Return += _token
                    Username_Camouflage_Count += 1

                else:
                    Username_Camouflage_Count += 1

    Password_Numbers_List = []
    with open(Password_DeCamo_File, 'r') as Password_Numbers_File:

        for token_ in Password_Numbers_File:
            Password_Numbers_List.append(int(token_))

    Password_Camouflage_Count = 0
    Password_Return = ''

    with open(Password_Camo_File, 'r') as Password_Camouflage_File:

        for _line in Password_Camouflage_File:
            for _token in _line:

                if Password_Camouflage_Count in Password_Numbers_List:
                    Password_Return += _token
                    Password_Camouflage_Count += 1

                else:
                    Password_Camouflage_Count += 1

    Decrypted_Success()

    print('Email: %s' % (Email_Return[::-1]))
    print('Username: %s' % (Username_Return[::-1]))
    print('Password: %s' % (Password_Return[::-1]))
    print()

def PasCam_A():
    ''' PasCam Program '''

    while True:

        PasCam_Menu()

        if Menu_Option == '1' or Menu_Option == '1.':
            PasCam_Encode()

            if Encode_Option == '1' or Encode_Option == '1.':
                PasCam_Encode1()

            elif Encode_Option == '2' or Encode_Option == '2.':
                PasCam_Encode2()

        elif Menu_Option == '2' or Menu_Option == '2.':
            PasCam_Decode()

            if input_count == 11130:
                PasCam_Decode1()

            elif input_count == 11140:
                PasCam_Decode2()

        elif Menu_Option == '3' or Menu_Option == '3.':
            PasCam_Encode()

            if Encode_Option == '1' or Encode_Option == '1.':
                PasCam_Encode1()

            elif Encode_Option == '2' or Encode_Option == '2.':
                PasCam_Encode2()

def PasCam_Passcode1(PasCam_Input):
    ''' hiding PasCam 1 of 2 '''
    global _input, input_length, input_file1

    while True:
        input_ = input('Enter the %s: ' % (PasCam_Input))
        _input = input('Re-Enter the %s: ' % (PasCam_Input))
        print()

        if input_ == _input:
            input_length = len(_input)

            input_file1 = PasCam_Camouflage(5)
            with open(input_file1, 'w') as input_open:
                count = 0
                n = 24
                i = 154

                while count < input_length:
                    number = (random.randint(n, i))
                    input_open.write('%s\n' % (number))
                    n = i + 1
                    i = i + 120
                    count += 1

            return _input, input_length, input_file1

        else:
            print('The %ss do not match. Please try again.' % (PasCam_Input))
            print()

def PasCam_Passcode2(_input, input_length, input_file1):
    ''' hiding PasCode 2 of 2 '''
    global input_file2

    input_available = []
    with open(input_file1, 'r') as input_open1:

        for input_number in input_open1:
            input_available.append(int(input_number.strip()))

    input_file2 = PasCam_Camouflage(5)
    with open(input_file2, 'w') as input_open2:
        input_camouflage = PasCam_Camouflage(5555)
        count = 0

        while input_length > 0:

            for input_token in input_camouflage:

                if count in input_available:
                    input_length -= 1
                    input_open2.write(_input[input_length])
                    count += 1

                elif count not in input_available:
                    input_open2.write(input_token)
                    count += 1

        input_open2.write(PasCam_Camouflage(5555))

    return input_file2

def PasCode_FirstTime():
    ''' creating PasCam PasCode '''

    with open('PasCode', 'w') as Pas_Code:

        Pas_Code.write(PasCam_Camouflage(5555))

        PasCam_Passcode1('PasCode')
        Pas_Code.write(input_file1)

        PasCam_Passcode2(_input, input_length, input_file1)
        Pas_Code.write(input_file2)

        Pas_Code.write(PasCam_Camouflage(5555))

def PasCam_Passcode3():
    ''' finding PasCam PasCode '''
    global PasCode_Real

    PasCode_DeCamo = [5556, 5557, 5558, 5559, 5560]
    PasCode_DeCamo_File = ''
    PasCode_Camo = [5561, 5562, 5563, 5564, 5565]
    PasCode_Camo_File = ''

    count_ = 1
    with open('PasCode', 'r') as input_open:

        for line in input_open:
            for token in line:

                if count_ in PasCode_DeCamo:
                    PasCode_DeCamo_File += token
                    count_ += 1

                elif count_ in PasCode_Camo:
                    PasCode_Camo_File += token
                    count_ += 1

                else:
                    count_ += 1

    PasCode_Numbers_List = []
    with open(PasCode_DeCamo_File, 'r') as PasCode_Numbers_File:

        for token_ in PasCode_Numbers_File:
            PasCode_Numbers_List.append(int(token_))

    PasCode_Camouflage_Count = 0
    PasCode_Return = ''
    with open(PasCode_Camo_File, 'r') as PasCode_Camouflage_File:

        for _line in PasCode_Camouflage_File:
            for _token in _line:

                if PasCode_Camouflage_Count in PasCode_Numbers_List:
                    PasCode_Return += _token
                    PasCode_Camouflage_Count += 1

                else:
                    PasCode_Camouflage_Count += 1

    PasCode_Real = PasCode_Return[::-1]

def PasCam_B():
    ''' includes program, access log, and security '''

    date = datetime.date.today()

    access_count = 0
    with open('Access_Log', 'r') as access_log:
        for line in access_log:
            access_count += 1

    if access_count == 0:

        print('I see this is your first time using PasCam!')
        print('Create a PasCode you\'ll remember for logging in.')
        print()

        PasCode_FirstTime()

        with open('Access_Log', 'a') as access_log:
            access_log.write('\n%s' % (date))

        PasCam_A()

    elif access_count != 0:

        print('Welcome back to PasCam')

        PasCam_Passcode3()

        PasCode_Attempts = 3
        while PasCode_Attempts > 0:

            PasCode_Entry = input('Enter your PasCode: ')
            print()

            if PasCode_Entry == PasCode_Real:

                with open('Access_Log', 'a') as access_log:
                    access_log.write('\n%s' % (date))

                PasCam_A()

            else:
                PasCode_Attempts -= 1
                print('PasCode incorrect. %d attempt(s) left.' % (PasCode_Attempts))
                print()

# PasCam Program #
PasCam_B()
