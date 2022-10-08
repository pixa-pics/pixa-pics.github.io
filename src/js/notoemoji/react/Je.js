import * as React from "react";

function SvgJe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={1000}
      height={600}
      viewBox="0 0 30 18"
      {...props}
    >
      <path fill="#fff" d="M0 0h30v18H0z" />
      <path d="M0 0l30 18M0 18L30 0" stroke="#df112d" strokeWidth={2} />
      <g stroke="#000" strokeWidth={0.015}>
        <path
          fill="#e8112d"
          d="M16.57 2.693c.385 1.561.174 3.489-1.567 4.559-1.742-1.07-1.953-2.998-1.568-4.559.41-.373 2.276-.603 3.135 0z"
        />
        <path
          fill="#f9dd16"
          d="M15 2.38c.638 0 1.233.169 1.584.388.068-.539.312-1.077.6-1.484-.3-.006-.435.154-.438.32-.075-.213-.37-.2-.46-.085.329.222.075.616-.222.535-.14-.038-.213-.135-.24-.277a.162.162 0 10-.068-.01.35.35 0 01-.384.165c-.156-.044-.222-.185-.222-.31 0-.325.313-.375.407-.319-.006-.219-.35-.394-.457-.213a.585.585 0 00-.1-.713c-.213.2-.219.5-.1.713-.106-.181-.45-.006-.457.213.094-.056.407-.006.407.32a.312.312 0 01-.222.31.35.35 0 01-.383-.167.162.162 0 10-.07.011c-.026.142-.1.239-.239.277-.297.081-.55-.313-.222-.535-.09-.116-.385-.128-.46.084-.003-.165-.138-.325-.438-.319.288.407.532.945.6 1.484.351-.22.946-.388 1.584-.388z"
        />
        <g id="JE_svg__a">
          <g fill="#f9dd16">
            <path d="M16.324 3.91c-.038.01-.038.06-.058.06.1-.003.148-.031.179-.081-.022.02-.003.058-.01.067.073-.025.108-.088.082-.13.017.024.064.037.08.039-.052-.04-.016-.133-.098-.18.027-.002.08.03.095.066-.013-.083-.025-.136-.093-.182.007.008.046.016.062 0a.11.11 0 01-.053-.103c.005-.04-.022-.05-.074-.036a1.2 1.2 0 01-.214.018c-.129 0-.241 0-.348-.074.16.067.364-.073.364-.189 0-.128-.158-.233-.477-.163-.32.07-.709.04-.709-.066 0-.107.279-.121.422-.1.143.023.246.037.514-.058-.066.026-.279.033-.448-.015-.169-.048-.584-.048-.587.176-.004.224.442.204.826.147.224-.033.342-.01.342.063 0 .07-.206.099-.364.08a1.226 1.226 0 00-.507.041c-.156.046-.264 0-.437.03-.083.014-.286 0-.386-.166-.062.044-.247.136-.278.226-.045.083-.015.165.044.246.074.102-.037.086-.116.09-.108.005-.253-.012-.329-.097-.067-.076-.156-.137-.227-.081-.037.029-.002.067.027.057.029-.011.063.01.094.024a.127.127 0 00-.124.014c-.03.026.006.075.041.058.028-.014.084-.023.12.01-.039-.007-.08-.006-.1.016-.02.021-.005.052.038.05.069-.003.086.045.155.035a.107.107 0 00-.077.044c.064-.03.135.05.218.032-.032.013-.084.045-.084.07.05-.058.382.043.39-.081a.105.105 0 01-.019.097c.042-.026.18-.035.222-.134.004.03-.002.068-.027.077.044.014.102-.019.161-.107.024-.035.03-.058.025-.084a.197.197 0 00.148-.051c.047-.04.099.033.18-.019.08-.051.15-.007.194-.033.044-.026.105.01.153-.02.047-.03.122.014.2-.048.125.045.27.13.626.064.204-.037.268.032.268.125 0 .065-.038.07-.066.072-.113.007-.162-.043-.207-.027-.03.011-.048.06-.005.077-.036.018-.031.052-.013.065.018.013.066.001.098-.014-.041.019-.084.052-.06.088.015.02.052.039.087-.006.035-.046.1-.084.14-.078zm-2.261-.969c-.103-.042-.137-.043-.114.04.01.036.035.087.06.11 0-.035.014-.132.054-.15z" />
            <path d="M14.384 2.941c.103-.042.138-.043.114.04a.275.275 0 01-.06.11c0-.035-.013-.132-.054-.15z" />
            <path d="M14.224 2.885c.195 0 .22.091.218.205 0 .123-.067.08-.104.239-.015.061-.064.065-.114.065s-.098-.004-.113-.065c-.038-.158-.104-.116-.105-.24 0-.113.024-.204.218-.204z" />
            <path d="M13.723 3.336c-.05-.03-.082-.01-.102-.004.064.017.067.1.214.138-.033-.01-.052.01-.083-.007.06.047.128.103.272.104.08.001.024.042-.028.019.054.056.162.01.23.112.013-.08-.127-.204-.063-.294-.198-.009-.214-.118-.328-.206-.093-.07-.102-.143-.143-.278-.018-.062-.09-.1-.13-.085-.035.012-.047.043-.017.065.03.023.068.026.076.083-.039-.047-.097-.064-.125-.034-.017.017-.01.058.026.062.06.006.017.064.085.121-.06-.067-.112-.074-.144-.037-.02.022 0 .061.041.057.06-.006.13.145.219.184zm1.597.567c-.031.006-.022.057-.064.06.1 0 .152-.023.2-.062-.022.013-.031.046-.033.065.053-.046.18-.05.246-.037.066.013.077-.018.1-.06.025-.043-.008-.067-.041-.1s-.04-.079-.033-.156c-.177-.235-.493-.121-.496-.018.114.132.128.117.224.136.095.018.154.018.09.071-.022.019-.114.01-.186.013-.16.007-.233-.11-.28-.05-.04.05 0 .073.08.07-.055 0-.128-.002-.115.049.02.086.103-.016.135.02-.027-.007-.07.01-.071.036-.002.026.06.06.13.005a.2.2 0 01.114-.042z" />
            <path d="M15.457 3.545a.303.303 0 00-.177-.02m-.687-.007c-.047.101-.019.151-.012.198m-.491-.679c.033.017.051-.03.099.02-.013-.015-.03.037-.066.003m.232-.023c-.032.017-.05-.03-.098.02.013-.015.03.037.066.003" />
            <path d="M14.257 3.056c-.011.01-.012-.007-.004.036.016.08.034.117-.03.117-.066 0-.046-.037-.03-.117.008-.043.007-.026-.004-.036" />
          </g>
          <path
            d="M14.224 3.362c.052 0 .082-.001.074-.075-.003-.03.036-.041.022-.089.015.059-.096.053-.096.027 0 .026-.111.032-.097-.027-.013.048.026.06.022.09-.008.073.023.074.075.074zm-.047-.149l-.126-.035m.126.042l-.14-.002m.141.009l-.12.032m.212-.046l.126-.035m-.126.042l.141-.002m-.141.009l.12.032"
            fill="#ff0016"
            strokeWidth={0.008}
          />
          <path
            d="M13.573 2.837c-.036-.045-.128-.007-.13.05.031-.037.082.016.11.005.018-.008.035-.036.02-.055zm-.047.108c-.037-.046-.128-.007-.13.05.03-.037.081.015.109.004.02-.007.036-.036.02-.054zm-.024.145c-.041-.042-.128.007-.123.063.026-.04.082.007.108-.007.019-.01.032-.04.015-.056zm.044.448c-.046-.036-.126.022-.116.077.022-.042.083-.002.108-.02.016-.011.026-.043.008-.057zm-.003.098c-.054-.02-.113.06-.085.109.007-.047.077-.028.095-.052.013-.016.013-.049-.01-.057zm.071.074c-.055-.021-.114.059-.086.108.007-.047.078-.028.096-.051.012-.017.012-.05-.01-.058zm1.434.141c-.055-.02-.114.06-.086.11.007-.048.078-.029.096-.052.012-.017.012-.05-.01-.058zm.073.067c-.056-.014-.105.072-.072.118.002-.048.074-.037.089-.062.01-.018.007-.05-.016-.056zm-.051-.161c-.051-.03-.122.04-.104.093.016-.045.082-.014.104-.035.015-.014.02-.046 0-.058zm1.02.115c-.057-.014-.106.072-.073.118.002-.048.074-.037.09-.062.01-.018.006-.05-.017-.056zm.001-.09c-.051-.028-.12.044-.1.096.015-.045.082-.017.103-.038.014-.014.018-.047-.003-.058zm.04.17c-.057-.01-.102.077-.067.122 0-.048.072-.04.086-.066.01-.019.005-.051-.019-.056zm-1.903-.634c.036 0 .05.01.05.075 0 .137-.001.196-.045.196-.045 0-.042-.056-.042-.157 0-.052 0-.079-.01-.074 0-.035.015-.04.047-.04z"
            fill="#0051ba"
            strokeWidth={0.002}
          />
        </g>
        <use xlinkHref="#JE_svg__a" transform="matrix(.9 0 0 .9 1.453 1.671)" />
        <use
          xlinkHref="#JE_svg__a"
          transform="matrix(.67 0 0 .75 4.909 3.354)"
        />
      </g>
    </svg>
  );
}

export default SvgJe;
