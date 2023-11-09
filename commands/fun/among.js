const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {

  name: "among",
  data: new SlashCommandBuilder()
    .setName("among")
    .setDescription("Choisir un salon.")
    .addChannelOption((option) =>
      option
        .setName("identifiant")
        .setDescription("Copiez votre ID de vocal")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers)
    .setDMPermission(false),

  async execute(interaction) {

    const target = interaction.options.getChannel("identifiant");

    if (target.type != 2) {
      interaction.reply("Veuillez choisir un salon vocal !");
    } else {
      const list = [];
      target.members.forEach((member) => {
        list.push(member);
      });

      if (list.length < 2) {
        interaction.reply(
          `Le vocal ${target} ne possède pas assez de membre [MINIMUM 7 REQUIS] !`
        );
      } else {
        const getRandomMember = () => {
          const randomIndex = Math.floor(Math.random() * list.length);
          return list[randomIndex];
        };

        let firstmember = getRandomMember();
        let firstmember2, firstmember3;

        do {
          firstmember2 = getRandomMember();
        } while (firstmember2 === firstmember);

        do {
          firstmember3 = getRandomMember();
        } while (firstmember3 === firstmember || firstmember3 === firstmember2);

        const embeds = new EmbedBuilder()
          .setColor(0xf4d03f)
          .setTitle("Règles de la partie ")
          .setAuthor({
            name: "Among Us",
            iconURL:
              "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec",
            url: "https://bobysait.com/roles/#mod-tor-role-0-0-maire",
          })
          .setDescription(
            `
                Le membre ${firstmember} est immunisé T1 pour cette partie !        
  
                L'imposteur doit tuer ${firstmember2} pour être immunisé T1 la prochaine partie !
  
                Le membre ${firstmember3} possède La Vengeance de l'Ombre !
    
              `
          )

          .setThumbnail(
            "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"
          )

          .setTimestamp();

        interaction.reply({ embeds: [embeds] });
      }
    }
  },
};
