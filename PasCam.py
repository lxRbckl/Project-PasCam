# Project PasCam 6 by Alex Arbuckle #


# Import <
from random import choice
from string import digits
from discord import Intents
from discord.ext.commands import Bot
from os import path, listdir, remove, mkdir
from string import ascii_letters as letters

# >


# Declaration <
path = path.realpath(__file__)[:-10]
PasCam = Bot(command_prefix = '', intents = Intents.all())
token = ''

# >


@PasCam.event
async def on_member_join(user):
    ''' user : class '''

    # If New User <
    if (str(user)[:-5] not in [i for i in listdir(path)]):

        mkdir(f'{path}/{str(user)[:-5]}')
        await user.send(f'Welcome to PasCam, {str(user)[:-5]}')

    # >

    else:

        await user.send(f'Welcome back to PasCam, {str(user)[:-5]}')


async def functionEncrypt(ctx, args):
    ''' args[0] : str
        args[1] : str '''

    strVariable = '{}{}{}'.format(args[0], 'space'.join(args[1:]), args[0])
    listVariableA = [choice(letters + digits) for i in range(555555 - len(strVariable))]
    listVariableB = [int((((int(str(ctx)[-4:])) + i) * i) / 10) for i in range(len(strVariable))]
    with open(f'{path}/{str(ctx)[:-5]}/{args[0]}.txt', 'w') as fileVariable:

        [listVariableA.insert(i, strVariable[listVariableB.index(i)]) for i in listVariableB]
        fileVariable.write(''.join(listVariableA))


async def functionDecrypt(ctx, arg):
    ''' arg : str '''

    listVariable = [int((((int(str(ctx)[-4:])) + i) * i) / 10) for i in range(500)]
    with open(f'{path}/{str(ctx)[:-5]}/{arg}.txt', 'r') as fileVariable:

        strVariable = ''.join(i for i in fileVariable)
        strVariable = ''.join(strVariable[i] for i in listVariable)

    return strVariable.split(arg)[1].split('space')


@PasCam.command(aliases = ['encr', 'encrypt', 'Encrypt'])
async def commandEncrypt(ctx, *args):
    ''' args[0] : str
        args[0<] : str '''

    # If Information Exists <
    if (args[0] in [i[:-4] for i in listdir(f'{path}/{str(ctx.author)[:-5]}')]):

        await ctx.author.send(f'Your information **{args[0]}** already exists.', delete_after = 60)

    # >

    else:

        await functionEncrypt(ctx.author, args)
        await ctx.author.send(f'Your information **{args[0]}** was encrypted.')


@PasCam.command(aliases = ['decr', 'decrypt', 'Decrypt'])
async def commandDecrypt(ctx, arg):
    ''' arg : str '''

    # If Information Exists <
    if (arg in [i[:-4] for i in listdir('{}/{}'.format(path, str(ctx.author)[:-5]))]):

        await ctx.author.send('\n'.join(await functionDecrypt(ctx.author, arg)), delete_after = 60)

    # >

    else:

        await ctx.author.send(f'Your information **{arg}** does not exist.', delete_after = 60)


@PasCam.command(aliases = ['update', 'Update'])
async def commandUpdate(ctx, *args):
    ''' args[0] : str
        args[0<] : str'''

    # If Information Exists <
    if (args[0] in [i[:-4] for i in listdir(f'{path}/{str(ctx.author)[:-5]}')]):

        await functionEncrypt(ctx.author, args)
        await ctx.author.send(f'Your information **{args[0]}** was updated.')

    # >

    else:

        await ctx.author.send(f'Your information **{args[0]}** does not exist.', delete_after = 60)


@PasCam.command(aliases = ['del', 'delete', 'Delete'])
async def commandDelete(ctx, arg):
    ''' arg : str '''

    # If Information Exists <
    if (arg in [i[:-4] for i in listdir(f'{path}/{str(ctx.author)[:-5]}')]):

        remove(f'{path}/{str(ctx.author)[:-5]}/{arg}')
        await ctx.author.send(f'Your information **{arg}** was deleted.', delete_after = 60)

    # >

    else:

        await ctx.author.send(f'Your information **{arg}** does not exist.', delete_after = 60)


@PasCam.command(aliases = ['share', 'Share'])
async def commandShare(ctx, *args):
    ''' args[0] : str
        args[1] : str '''

    for i in PasCam.get_all_members():

        # If Input User <
        if (str(i) == args[0]):

            # If Information Exists <
            if (args[1] in [j[:-4] for j in listdir(f'{path}/{str(i)[:-5]}')]):

                await ctx.author.send(f'**{args[1]}** for **{str(i)[:-5]}** already exists.', delete_after = 60)

            # >

            else:

                # Stack <
                listVariableA = [args[1]]
                [listVariableA.append(i) for i in await functionDecrypt(ctx.author, args[1])]

                # >

                await functionEncrypt(i, listVariableA)

                await ctx.author.send(f'Your information **{args[1]}** was shared with **{str(i)[:-5]}**.')
                await i.send(f'**{str(ctx.author)[:-5]}** has shared **{args[1]}** with you.')

        # >


@PasCam.command(aliases = ['show', 'Show'])
async def commandShow(ctx):
    '''  '''

    listVariable = sorted([i[:-4] for i in listdir(f'{path}/{str(ctx.author)[:-5]}')])
    await ctx.author.send('\n'.join(listVariable), delete_after = 60)


# Main <
if (__name__ == '__main__'):

    PasCam.run(token)

# >


# In Loving Memory of The Bunny. #
