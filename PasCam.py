# PasCam by Alex Arbuckle #

from discord.ext import commands
import discord, random, string, os

token = ''
client = commands.Bot(command_prefix = '')

@client.event
async def on_member_join(user):
    '''  '''

    os.mkdir('{}/{}'.format(os.getcwd(), str(user)[:-5]))

    await user.send('\nWelcome to PasCam.')

@client.command()
async def encrypt(ctx, arg, *args):
    '''  '''

    if (os.path.isfile('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg))):

        await ctx.send('Your information for {} already exists.'.format(arg), delete_after = 60.0)

    else:

        num = int(str(ctx.author)[-4::])
        var = [num := int((num + 500) + int(str(ctx.author)[-2::])) for i in range(len('::'.join(list(args)) + ';;'))]
        with open('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg), 'w') as f:

            encr = list(''.join(random.choice(string.ascii_letters + string.digits) for i in range(100000 - len(var))))
            [encr.insert(i, ('::'.join(list(args)) + ';;')[c]) for c, i in enumerate(var)]

            f.write(''.join(encr))

        await ctx.author.send('Your information for {} has been saved.'.format(arg), delete_after = 60.0)

@client.command()
async def update(ctx, arg, *args):
    '''  '''

    if (os.path.isfile('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg))):

        num = int(str(ctx.author)[-4::])
        var = [num := int((num + 500) + int(str(ctx.author)[-2::])) for i in range(len('::'.join(list(args)) + ';;'))]
        with open('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg), 'w') as f:

            encr = list(''.join(random.choice(string.ascii_letters + string.digits) for i in range(100000 - len(var))))
            [encr.insert(i, ('::'.join(list(args)) + ';;')[c]) for c, i in enumerate(var)]

            f.write(''.join(encr))

        await ctx.author.send('Your information for {} has been saved.'.format(arg), delete_after = 60.0)

    else:

        await ctx.author.send('Your information for {} does not exist.'.format(arg), delete_after = 60.0)

@client.command()
async def decrypt(ctx, arg):
    '''  '''

    if (os.path.isfile('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg))):

        num = int(str(ctx.author)[-4::])
        var = [num := int((num + 500) + int(str(ctx.author)[-2::])) for i in range(100)]
        with open('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg), 'r') as f:

            decr = ''.join(n for m in f for c, n in enumerate(m) if (c in var)).split(';;')[0].split('::')

            [await ctx.author.send('{}'.format(i), delete_after = 60.0) for i in decr]

    else:

        await ctx.author.send('Your information for {} does not exist.'.format(arg), delete_after = 60.0)

@client.command()
async def delete(ctx, arg):
    '''  '''

    if (os.path.isfile('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg))):

        os.remove('{}/{}/{}.txt'.format(os.getcwd(), str(ctx.author)[:-5], arg))

        await ctx.author.send('Your information for {} has been removed.'.format(arg))

    else:

       await ctx.author.send('Your information for {} does not exist.'.format(arg), delete_after = 60.0)

@client.command()
async def show(ctx):
    '''  '''

    l = [e for e in os.listdir('{}/{}'.format(os.getcwd(), str(ctx.author)[:-5]))]

    [await ctx.author.send(''.join('{}\n'.format(i[:-4]) for i in sorted(l) if ('.txt' in i)), delete_after = 120.0)]

client.run(token)
