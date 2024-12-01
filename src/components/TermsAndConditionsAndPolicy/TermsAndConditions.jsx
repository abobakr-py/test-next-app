import useLanguage from "@/context/useLanguage";

const TermsAndConditions = ({ mobile }) => {
  const { language } = useLanguage();

  return (
    <div
      className={`
        ${language === "en" ? "text-left" : "text-right"}
        flex-grow mt-24 ${
          mobile ? "mx-4" : "mx-[8.75rem]"
        } font-ibm mb-[7.25rem]
      `}
    >
      {language === "en" ? (
        <>
          <h1 className="text-[#121212] text-[2.5rem] leading-[3.25rem]">
            Terms and Conditions for Sabika App
          </h1>

          <h2 className="text-xl text-[#121212] leading-[1.625rem] mt-12">
            1. Acceptance of Terms :
          </h2>
          <p className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            1.1 By accessing or using the Sabika app, you agree to be bound by
            these Terms and Conditions. If you do not agree to these terms,
            please do not use the app.
          </p>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            2. Account Creation
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>2.1 To use Sabika, you must create an account.</p>
            <br />
            <p>
              2.2 You agree to provide accurate and complete information during
              the registration process.
            </p>
            <br />
            <p>
              2.3 You are responsible for maintaining the confidentiality of
              your account credentials and for all activities that occur under
              your account.  
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            3. KYC Verification
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              3.1 Before adding funds or purchasing gold fractions, you must
              complete the Know Your Customer (KYC) verification process.
            </p>
            <br />
            <p>
              3.2 Sabika reserves the right to verify your identity at any time.
            </p>
            <br />
            <p>
              3.3 Failure to complete KYC verification may result in limitations
              on your account functionality.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            4. Gold Fractions
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>4.1 Sabika offers the ability to buy and sell gold fractions.</p>
            <br />
            <p>
              4.2 Gold fractions are digital representations of physical gold
              held by Sabika.
            </p>
            <br />
            <p>
              4.3 You do not have the right to physical delivery of gold
              fractions.
            </p>
          </div>

          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            5. Wallet
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              5.1 Sabika provides a wallet for users to add funds for purchasing
              gold fractions.
            </p>
            <br />
            <p>
              5.2 Funds added to the wallet can only be used to purchase gold
              fractions or withdrawn as proceeds from gold fraction sales.
            </p>
            <br />
            <p>
              5.3 Funds that have not been used to purchase gold fractions
              cannot be withdrawn.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            6. Purchases and Sales
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              6.1 You can buy and sell gold fractions through the Sabika app at
              any time and from any location.
            </p>
            <br />
            <p>
              6.2 Sabika reserves the right to temporarily suspend trading for
              maintenance or other reasons.
            </p>
            <br />
            <p>
              6.3 All purchases and sales of gold fractions are subject to the
              terms and conditions of Sabika.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            7. Phone Number
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              7.1 Your phone number is linked to your Sabika account and cannot
              be changed.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            8. Security
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              8.1 You are responsible for safeguarding your account credentials.
            </p>
            <br />
            <p>
              8.2 Sabika employs industry-standard security measures to protect
              user data.
            </p>
            <br />
            <p>
              8.3 However, Sabika cannot guarantee complete security and is not
              liable for any unauthorized access to your account.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            9. Limitation of Liability
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              9.1 Sabika is not responsible for any losses incurred as a result
              of fluctuations in the price of gold or any other market
              conditions.
            </p>
            <br />
            <p>
              9.2 Sabika is not liable for any indirect, incidental, or
              consequential damages arising from the use of the app.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            10. Termination
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              10.1 Sabika reserves the right to terminate your account at any
              time without notice, for any reason.
            </p>
            <br />
            <p>
              10.2 Upon termination, your access to the app and your account
              will be disabled.
            </p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            11. Governing Law
          </h2>
          <p className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            11.1 These Terms and Conditions are governed by and construed in
            accordance with the laws of the Central Bank of Egypt. Any disputes
            arising under or in connection with these terms shall be subject to
            the exclusive jurisdiction of the courts 1 in Central Bank of Egypt.
             
          </p>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            12. Changes to Terms
          </h2>
          <p className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            12.1 Sabika reserves the right to modify these Terms and Conditions
            at any time. Changes will be effective upon posting on the app.
          </p>

          <h2 className="text-xl text-[#121212] leading-[1.625rem]">
            13. Account Deletion
          </h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <p>
              13.1 Users can delete their Sabika account at any time through the
              app.
            </p>
            <br />
            <p>
              13.2 Upon deleting the account, Sabika will delete the account and
              all associated data.
            </p>
            <br />
            <p>
              13.3 Users acknowledge and agree that deleting the account is
              final and data cannot be recovered.
            </p>
            <br />
            <p>
              13.4 Sabika reserves the right to terminate a user&apos;s account
              for any reason, including but not limited to violation of these
              Terms and Conditions.
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-[#121212] text-[2.5rem] leading-[3.25rem] mb-16 mt-4">
            شروط وأحكام تطبيق سبيكة
          </h1>
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              قبول الشروط
            </h2>
            <p>.1</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p className=" ">
                . عند الوصول إلى تطبيق سبيكة أو استخدامه، فإنك توافق على
                الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط،
                يرجى عدم استخدام التطبيق
              </p>{" "}
              <p> 1.1 </p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              إنشاء حساب
            </h2>
            <p>.2</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p> . لاستخدام سبيكة، يجب عليك إنشاء حساب </p>
              <p> 2.1 </p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>. توافق على تقديم معلومات دقيقة وكاملة خلال عملية التسجيل</p>
              <p> 2.2 </p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع
                الأنشطة التي تحدث تحت حسابك
              </p>
              <p> 2.3 </p>
            </div>{" "}
          </div>
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              (KYC) التحقق من الهوية
            </h2>
            <p>.3</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . (KYC) قبل إضافة أموال أو شراء حصص ذهبية، يجب عليك إتمام عملية
                التحقق من الهوية
              </p>
              <p> 3.1 </p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p> . يحتفظ سبيكة بالحق في التحقق من هويتك في أي وقت</p>
              <p> 3.2 </p>
            </div>{" "}
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . عدم إتمام التحقق من الهوية قد يؤدي إلى قيود على وظيفة حسابك
              </p>
              <p> 3.3 </p>
            </div>{" "}
          </div>
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              حصص الذهب
            </h2>
            <p>.4</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>. يقدم سبيكة إمكانية شراء وبيع حصص الذهب</p>
              <p> 4.1 </p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . حصص الذهب هي تمثيلات رقمية للذهب الفعلي المحتفظ به من قبل
                سبيكة
              </p>
              <p> 4.2 </p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>. ليس لك الحق في طلب تسليم مادي لحصص الذهب</p>
              <p> 4.3 </p>
            </div>

            <br />
          </div>
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              المحفظة{" "}
            </h2>
            <p>.5</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يوفر سبيكة محفظة للمستخدمين لإضافة الأموال لشراء حصص الذهب
              </p>
              <p>5.1</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يمكن استخدام الأموال المضافة إلى المحفظة فقط لشراء حصص الذهب
                أو سحبها كعائدات من مبيعات حصص الذهب
              </p>
              <p>5.2</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>. لا يمكن سحب الأموال التي لم تُستخدم لشراء حصص الذهب</p>
              <p>5.3</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              الشراء والبيع
            </h2>
            <p>.6</p>
          </div>
          <h2 className="text-xl text-[#121212] leading-[1.625rem]"></h2>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يمكنك شراء وبيع حصص الذهب من خلال تطبيق سبيكة في أي وقت ومن أي
                مكان
              </p>
              <p>6.1</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يحتفظ سبيكة بالحق في تعليق التداول مؤقتًا لأغراض الصيانة أو
                لأسباب أخرى
              </p>
              <p>6.2</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . جميع عمليات شراء وبيع حصص الذهب تخضع للشروط والأحكام الخاصة بـ
                سبيكة
              </p>
              <p>6.3</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              رقم الهاتف
            </h2>
            <p>.7</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>. رقم هاتفك مرتبط بحساب سبيكة الخاص بك ولا يمكن تغييره</p>
              <p>7.1</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              الأمان{" "}
            </h2>
            <p>.8</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>. أنت مسؤول عن حماية بيانات اعتماد حسابك</p>
              <p>8.1</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يستخدم سبيكة تدابير الأمان القياسية لحماية بيانات المستخدمين
              </p>
              <p>8.2</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . ومع ذلك، لا يمكن لـ سبيكة ضمان الأمان الكامل وليس مسؤولاً عن
                أي وصول غير مصرح به إلى حسابك
              </p>
              <p>8.3</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              تحديد المسؤولية
            </h2>
            <p>.9</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . لا يتحمل سبيكة مسؤولية أي خسائر ناتجة عن تقلبات أسعار الذهب أو
                أي ظروف سوق أخرى
              </p>
              <p>9.1</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . لا يتحمل سبيكة مسؤولية أي أضرار غير مباشرة أو عرضية أو تبعية
                تنشأ عن استخدام التطبيق
              </p>
              <p>9.2</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              إنهاء الحساب
            </h2>
            <p>.10</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . يحتفظ سبيكة بالحق في إنهاء حسابك في أي وقت دون إشعار، ولأي سبب
                كان
              </p>
              <p>10.1</p>
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>. عند إنهاء الحساب، سيتم تعطيل وصولك إلى التطبيق وحسابك</p>
              <p>10.2</p>
            </div>
          </div>
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              القانون المطبق
            </h2>
            <p>.11</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p>
                . تخضع هذه الشروط والأحكام وتفسر وفقًا لقوانين البنك المركزي
                المصري. أي نزاعات تنشأ بموجب أو تتعلق بهذه الشروط ستكون خاضعة
                للاختصاص القضائي الحصري للمحاكم في البنك المركزي المصري
              </p>{" "}
              <p>11.1</p>
            </div>
          </div>

          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              تغييرات على الشروط
            </h2>
            <p>.12</p>
          </div>
          <br />
          <div className="flex ml-auto w-fit gap-1">
            <p>
              . يحتفظ سبيكة بالحق في تعديل هذه الشروط والأحكام في أي وقت. ستصبح
              التعديلات سارية عند نشرها على التطبيق
            </p>
            <p>12.1</p>
          </div>
          <br />
          <div className="flex ml-auto w-fit gap-1">
            <h2 className="text-xl text-[#121212] leading-[1.625rem] ">
              حذف الحساب{" "}
            </h2>
            <p>.13</p>
          </div>
          <div className="text-base text-[#4c4c4c] mt-6 leading-[1.3rem] mb-8">
            <div className="flex ml-auto w-fit gap-1">
              <p> .يمكن للمستخدم حذف حسابه في أي وقت باستخدام التطبيق</p>
              <p>13.1</p>{" "}
            </div>
            <br />
            <div className="flex ml-auto w-fit gap-1">
              <p>
                .عند طلب حذف الحساب، ستقوم سبيكة بحذف الحساب وجميع البيانات
                المرتبطة به
              </p>
              <p>13.2</p>
            </div>{" "}
            <br />
            <div className="flex ml-auto w-fit gap-1">
              {" "}
              <p>
                .يقر المستخدم ويوافق على أن حذف الحساب نهائي ولا يمكن استعادة
                البيانات بعد ذلك
              </p>
              <p>13.3</p>
            </div>{" "}
            <br />
            <div className="flex ml-auto w-fit gap-1">
              {" "}
              <p>
                . تحتفظ سبيكة بالحق في إنهاء حساب المستخدم لأي سبب، بما في ذلك
                على سبيل المثال لا الحصر، انتهاك هذه الشروط والأحكام
              </p>
              <p>13.4</p>
            </div>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default TermsAndConditions;
