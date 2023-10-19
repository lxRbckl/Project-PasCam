# Project PasCam 7 by Alex Arbuckle #


# import <
from random import choice
from json import load, dump
from discord import Intents
from string import printable
from discord.ext import commands
from os import path, listdir, mkdir, remove

# >


# global <
realpath = path.realpath(__file__).split('/')
directory = '/'.join(realpath[:(len(realpath) - 1)])
PasCam = commands.Bot(command_prefix = '', intents = Intents.all())
token = ''

# >


def jsonLoad(file: str) -> list:
    '''  '''

    # get file <
    # get data <
    with open(f'{directory}/{file}', 'r') as fin:

        return load(fin)

    # >


def jsonDump(file: str, data: dict) -> None:
    '''  '''

    # set file <
    # set data <
    with open(f'{directory}/{file}', 'w') as fout:

        dump(data, fout, indent = 3)

    # >


def encryptFunction(host: str, file: str, encr: str) -> None:
    '''  '''

    # local <
    char = printable[0:77] + printable[79:85] + printable[86:94]
    strList = [choice(char) for i in range(250000)]
    encrList = [sum([ord(i) for i in host])]

    # >

    # set index list <
    # set value from index <
    [encrList.append(encrList[-1] + ord(i)) for i in encr[:len(encr)]]
    [strList.insert(i, encr[c]) for c, i in enumerate(encrList[:len(encrList) - 1])]

    # >

    # set <
    jsonDump(file = f'{host}/{file}.json', data = strList)

    # >


def decryptFunction(host: str, file: str) -> str:
    '''  '''

    # local <
    decrList = [sum([ord(i) for i in host])]
    strList = jsonLoad(file=f'{host}/{file}.json')

    # >

    # get index list <
    # output str values from indices <
    [decrList.append(decrList[-1] + ord(strList[decrList[-1]])) for i in range(2000)]
    return ''.join([strList[i] for i in decrList])

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['encrypt'])
async def encryptCommand(ctx, file: str, *args, encr = None):
    '''  '''

    # if (new host) <
    # then (existing host) <
    if (str(ctx.author) not in listdir(directory)):

        # set directory <
        # set profile <
        # reset <
        mkdir(f'{directory}/{str(ctx.author)}')
        encryptFunction(

            host = str(ctx.author),
            file = str(ctx.author),
            encr = str(ctx.author.id) + ';;'

        )
        await encryptCommand(ctx, file, encr = args)

        # >

    else:

        # if (new file) <
        # then (existing file) <
        if (f'{file}.json' not in listdir(f'{directory}/{str(ctx.author)}')):

            # format <
            encr = '::'.join(encr) if (encr) else '::'.join(args)
            encr += ';;' + str(ctx.author) + ';;'

            # >

            encryptFunction(

                file = file,
                encr = encr,
                host = str(ctx.author)

            )

            await ctx.author.send(f'`{file} was encrypted.`', delete_after = 60)

        else: await ctx.author.send(f'`{file} already exists.`', delete_after = 60)

        # >

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['decrypt'])
async def decryptCommand(ctx, file: str, host = None):
    '''  '''

    # if (existing file) <
    # then (new file) <
    if (f'{file}.json' in listdir(f'{directory}/{str(ctx.author)}')):

        decr, share, other = decryptFunction(

            file = file,
            host = host if (host) else str(ctx.author)

        ).split(';;')

        # if (shared file) <
        # elif (has access) <
        # then (no access) <
        if ('(+)' in decr):

            await decryptCommand(

                ctx,
                file = file,
                host = decr.split('::')[1]

            )

        elif (str(ctx.author) in share):

            await ctx.author.send(

                delete_after = 60,
                content = '||`{}`||'.format(decr.replace('::', '\n'))

            )

        else: await ctx.author.send(f'`{file} does not exist.`', delete_after = 60)

        # >

    else: await ctx.author.send(f'`{file} does not exist.`', delete_after = 60)

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['update'])
async def updateCommand(ctx, file: str, *args):
    '''  '''

    # if (existing file) <
    # then (new file) <
    if (f'{file}.json' in listdir(f'{directory}/{str(ctx.author)}')):

        decr, share, other = decryptFunction(

            file = file,
            host = str(ctx.author)

        ).split(';;')

        share = share if (share) else str(ctx.author)
        encryptFunction(

            file = file,
            host = str(ctx.author),
            encr = '::'.join(args) + ';;' + share + ';;'

        )

        # output <
        await ctx.author.send(f'`{file} was updated.`', delete_after = 60)

        # >

    else: await ctx.author.send(f'`{file} does not exist.`', delete_after = 60)

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['delete'])
async def deleteCommand(ctx, file: str):
    '''  '''

    # if (existing file) <
    # then (new file) <
    if (f'{file}.json' in listdir(f'{directory}/{str(ctx.author)}')):

        # remove file <
        # output update <
        remove(f'{directory}/{str(ctx.author)}/{file}.json')
        await ctx.author.send(f'`{file} was removed.`', delete_after = 60)

        # >

    else: await ctx.author.send(f'`{file} does not exist.`', delete_after = 60)

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['share'])
async def shareCommand(ctx, action: str, file: str, user: str):
    '''  '''

    # if ((existing user) and (existing file)) <
    # then (new file) or (unavailable user) <
    if (user in listdir(directory)):

        auth = str(ctx.author)
        decr, share, other = decryptFunction(

            file = file,
            host = auth

        ).split(';;')

        # local <
        shareA = share.split('::')
        shareB = share.split('::')
        notShare = '(+)' not in decr
        checkUser = user not in shareA
        isAdd = 'add' in action.lower()
        isRemove = 'rem' in action.lower()
        checkFile = (f'{file}.json' not in listdir(f'{directory}/{user}'))

        # >

        # if (update) <
        # then (no action) <
        if ((isAdd) or (isRemove)):

            # if (remove action) <
            # elif (add action) <
            if ((isRemove) and (not checkUser) and (notShare)): shareA.remove(user)
            elif ((isAdd) and (checkFile) and (checkUser) and (notShare)):

                shareA.append(user)
                encryptFunction(

                    host = user,
                    file = file,
                    encr = f'(+)::{auth}' + ';;;;'

                )

            # >

            # if (update) <
            # then (no update) <
            if (shareA != shareB):

                a = 'added' if (shareA > shareB) else 'removed'
                encryptFunction(

                    host = auth,
                    file = file,
                    encr = ';;'.join([decr, '::'.join(shareA)]) + ';;'

                )
                uid, other = decryptFunction(

                    host = user,
                    file = user

                ).split(';;')

                # notify host <
                # notify recipient <
                await ctx.author.send(f'`{file} was {a} to {user}.`')
                await PasCam.get_user(int(uid)).send(f'`{auth} {a} {file}.`')

                # >

            else: await ctx.author.send('`Failed to share.`', delete_after = 60)

            # >

        else: await ctx.author.send('`Failed to share.`', delete_after = 60)

        # >

    else: await ctx.author.send('`File/User does not exist.`', delete_after = 60)

    # >


@PasCam.command(aliases = jsonLoad(file = 'setting.json')['alias']['show'])
async def showCommand(ctx, file = None):
    '''  '''

    # if (single file) <
    # then (all files) <
    if (f'{file}.json' in listdir(f'{directory}/{str(ctx.author)}')):

        decr, share, other = decryptFunction(

            file = file,
            host = str(ctx.author)

        ).split(';;')

        # if (not shared file) <
        # then (shared file) <
        if ('(+)' not in decr):

            await ctx.author.send(

                delete_after = 60,
                content='\n'.join([f'`{i}`' for i in share.split('::')])

            )

        else: await ctx.author.send(f'`{file} is shared.`', delete_after=60)

        # >

    else:

        # get list <
        # filter list <
        show = [f'`{i[:-5]}`' for i in listdir(f'{directory}/{str(ctx.author)}')]
        show.remove(f'`{str(ctx.author)}`')

        # >

        # if (empty) <
        # then (not empty) <
        if (len(show) == 0): await ctx.author.send('`Empty directory.`', delete_after = 60)
        else: await ctx.author.send('\n'.join(sorted(show)), delete_after = 60)

        # >

    # >


# main <
if (__name__ == '__main__'): PasCam.run(token)

# >


# In Loving Memory of The Bunny. #
