# PasCam 5 by Alex Arbuckle #

from random import choice
from string import digits
from discord import Intents
from discord.ext.commands import Bot
from string import ascii_letters as letters
from os import getcwd, listdir, remove, mkdir


PasCam = Bot(command_prefix = '', intents = Intents.all())


@PasCam.event
async def on_member_join(ctx):
    '''  '''

    if (str(ctx)[:-5] in [i for i in listdir()]):

        strVariable = ('Welcome back to PasCam, {}.'.format(str(ctx)[:-5]))

    else:

        strVariable = ('Welcome to PasCam, {}.'.format(str(ctx)[:-5]))
        mkdir('{}/{}'.format(getcwd(), str(ctx)[:-5]))

    await ctx.send(strVariable)


async def functionEncrypt(ctx, arg, args):
    '''  '''

    strVariable = '{}{}{}'.format(arg, 'space'.join(args), arg)
    listVariableA = [choice(letters + digits) for i in range(555555 - len(strVariable))]
    listVariableB = [int((((int(str(ctx)[-4:])) + i) * i) / 10) for i in range(len(strVariable))]
    with open('{}/{}/{}.txt'.format(getcwd(), str(ctx)[:-5], arg), 'w') as fileVariable:

        [listVariableA.insert(i, strVariable[listVariableB.index(i)]) for i in listVariableB]
        fileVariable.write(''.join(listVariableA))


async def functionDecrypt(ctx, arg):
    '''  '''

    listVariable = [int((((int(str(ctx)[-4:])) + i) * i) / 10) for i in range(500)]
    with open('{}/{}/{}.txt'.format(getcwd(), str(ctx)[:-5], arg), 'r') as fileVariable:

        strVariable = ''.join(i for i in fileVariable)
        strVariable = ''.join(strVariable[i] for i in listVariable)

    return strVariable.split(arg)[1].split('space')


@PasCam.command(aliases = ['encr', 'Encr', 'Encrypt'])
async def encrypt(ctx, arg, *args):
    '''  '''

    if (arg in [i[:-4] for i in listdir('{}/{}'.format(getcwd(), str(ctx.author)[:-5]))]):

        strVariable = 'Your information **{}** already exists.'.format(arg)

    else:

        await functionEncrypt(ctx.author, arg, list(args))
        strVariable = 'Your information **{}** has been encrypted.'.format(arg)

    await ctx.author.send(strVariable, delete_after = 60)


@PasCam.command(aliases = ['Update', 'upd'])
async def update(ctx, arg, *args):
    '''  '''

    if (arg in [i[:-4] for i in listdir('{}/{}'.format(getcwd(), str(ctx.author)[:-5]))]):

        await functionEncrypt(ctx.author, arg, list(args))
        strVariable = 'Your information **{}** has been updated.'.format(arg)

    else:

        strVariable = 'Your information **{}** does not exist.'.format(arg)

    await ctx.author.send(strVariable, delete_after = 60)


@PasCam.command(aliases = ['Decr', 'decr', 'Decrypt'])
async def decrypt(ctx, arg):
    '''  '''

    if (arg in [i[:-4] for i in listdir('{}/{}'.format(getcwd(), str(ctx.author)[:-5]))]):

        await ctx.author.send('\n'.join(await functionDecrypt(ctx.author, arg)), delete_after = 60)

    else:

        await ctx.author.send('Your information **{}** does not exist.'.format(arg), delete_after = 60)


@PasCam.command(aliases = ['Del', 'del', 'Delete'])
async def delete(ctx, arg):
    '''  '''

    if (arg in [i[:-4] for i in listdir('{}/{}'.format(getcwd(), str(ctx.author)[:-5]))]):

        remove('{}/{}/{}.txt'.format(getcwd(), str(ctx.author)[:-5], arg))
        strVariable = 'Your information **{}** was deleted.'.format(arg)

    else:

        strVariable = 'Your information **{}** does not exist.'.format(arg)

    await ctx.author.send(strVariable, delete_after = 60)


@PasCam.command(aliases = ['Share'])
async def share(ctx, arg, *args):
    '''  '''

    for i in list(args):

        for j in PasCam.get_all_members():

            if (str(j)[-4:] == i[-4:]):

                if (arg in [k[:-4] for k in listdir('{}/{}'.format(getcwd(), i[:-5]))]):

                    await ctx.author.send('**{}** for **{}** already exists.'.format(arg, i[:-5]))

                else:

                    await functionEncrypt(i, arg, await functionDecrypt(ctx.author, arg))

                    await j.send('**{}** has shared **{}** with you.'.format(str(ctx.author)[:-5], arg))
                    await ctx.author.send('Your information **{}** was shared with **{}**.'.format(arg, i))


@PasCam.command()
async def show(ctx):
    '''  '''

    strVariable = str(ctx.author)[:-5]
    listVariable = sorted([i[:-4] for i in listdir('{}/{}'.format(getcwd(), strVariable))])

    await ctx.author.send('\n'.join(listVariable), delete_after = 60)


PasCam.run('')


# In loving memory of The Bunny. #
