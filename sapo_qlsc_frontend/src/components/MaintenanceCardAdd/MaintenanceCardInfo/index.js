import { AutoComplete, DatePicker, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { formatDate } from "../../../utils/DateFormat";
import "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { formatPlate } from "../../../utils/PlatesNumberFormat";
const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const colors = [
  {
    label: "Màu sắc",
    options: [
      {
        value: "Xanh lá",
        label: <div>Xanh lá</div>,
      },
      {
        value: "Đỏ",
        label: <div>Đỏ</div>,
      },
      {
        value: "Tím",
        label: <div>Tím</div>,
      },
      {
        value: "Vàng",
        label: <div>Vàng</div>,
      },
      {
        value: "Xanh dương",
        label: <div>Xanh dương</div>,
      },
      {
        value: "Trắng",
        label: <div>Trắng</div>,
      },
      {
        value: "Đen",
        label: <div>Đen</div>,
      },
    ],
  },
];

const models = [
  {
    label: "Loại xe",
    options: [
      {
        value: "Vision ",
        label: <div>Vision</div>,
      },
      {
        value: "Lead",
        label: <div>Lead</div>,
      },
      {
        value: "SH mode",
        label: <div>SH mode</div>,
      },
      {
        value: "Air blade",
        label: <div>Air blade</div>,
      },
      {
        value: "Wave",
        label: <div>Wave</div>,
      },
      {
        value: "Winner",
        label: <div>Winner</div>,
      },
    ],
  },
];

const MaintenanceCardInfo = (props) => {
  const [info, setInfo] = useState({});
  const [id, setId] = useState(0);
  const [coordinator, setCoordinator] = useState({});
  const [edit, setEdit] = useState(false);
  const [lisRepairman, setLisRepairman] = useState([]);
  const [repairmanSearch, setRepairmanSearch] = useState("");
  const [repairmanPage, setRepairmanPage] = useState(0);
  const [totalRepairman, setTotalRepairman] = useState(0);
  const [plateNumbers, setPlateNumbers] = useState([]);
  const [user, setUser] = useState({
    role: 0,
  });
  const formRef = React.createRef();
  // const [auto, setAuto] = useState("");

  useEffect(() => {
    console.log(1);
    setEdit(props.maintenanceCardAdd.repairman.edit);
    if (
      props.maintenanceCardAdd.repairman === null ||
      props.maintenanceCardAdd.repairman === undefined
    ) {
      setRepairmanSearch("");
    } else {
      setRepairmanSearch(props.maintenanceCardAdd.repairman.fullName);
    }
    // setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)
  }, [props.maintenanceCardAdd.repairman]);

  useEffect(() => {
    if (props.maintenanceCardAdd.id !== 0) {
      setCoordinator(props.maintenanceCardAdd.coordinator);
    } else {
      setCoordinator(props.user);
    }
    setId(props.maintenanceCardAdd.id);
    setUser(props.user);
  }, [
    props.user,
    props.maintenanceCardAdd.coordinator,
    props.maintenanceCardAdd.id,
  ]);

  useEffect(() => {
    setInfo(props.maintenanceCardAdd.info);
  }, [props.maintenanceCardAdd.info]);
  useEffect(() => {
    setRepairmanPage(props.maintenanceCardAdd.repairmanPage);
  }, [props.maintenanceCardAdd.repairmanPage]);
  useEffect(() => {
    setTotalRepairman(props.maintenanceCardAdd.totalRepairman);
  }, [props.maintenanceCardAdd.totalRepairman]);
  useEffect(() => {
    setLisRepairman(props.maintenanceCardAdd.listRepairman);
  }, [props.maintenanceCardAdd.listRepairman]);

  useEffect(() => {
    console.log(props.maintenanceCardAdd.plates);
    setPlateNumbers(props.maintenanceCardAdd.plates);
  }, [props.maintenanceCardAdd.plates]);
  // useEffect(() => {
  //     if(props.maintenanceCardAdd.repairman.user === null || props.maintenanceCardAdd.repairman.user === undefined){
  //         setRepairmanSearch(null)
  //     }
  //     else{
  //         setRepairmanSearch(props.maintenanceCardAdd.repairman.user.fullName)
  //     }
  // }, [props.maintenanceCardAdd.repairman]);
  const renderRepairmanItem = (repairman) => {
    return {
      value: repairman.id.toString(),
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{repairman.fullName}</span>
          <span>{repairman.totalMaintenanceCard}</span>
        </div>
      ),
    };
  };

  const renderRepairmanOptions = () => {
    let result = [];
    result = lisRepairman.map((item, index) => {
      return renderRepairmanItem(item);
    });

    return [
      {
        label: <span>Thông tin nhân viên sửa chữa</span>,
        options: result,
      },
    ];
  };

  const renderPlatesOptions = () => {
    let result = [];
    result = plateNumbers.map((item, index) => {
      return {
        value: item.plateNumber,
        label: <span>{item.plateNumber}</span>,
      };
    });
    return [
      {
        label: <span>Danh sách biển số xe</span>,
        options: result,
      },
    ];
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const selectRepairmanItem = (value) => {
    const { maintenanceCardAddActionCreators } = props;
    const { actChooseRepairman } = maintenanceCardAddActionCreators;
    actChooseRepairman(value);
  };

  const focusRepairmanInput = () => {
    const { maintenanceCardAddActionCreators } = props;
    const { actSearchRepairman } = maintenanceCardAddActionCreators;
    if (repairmanSearch === undefined) {
      actSearchRepairman("", 1, 7);
    } else {
      actSearchRepairman(repairmanSearch, 1, 7);
    }
  };

  const handleChangeRepairmanSearch = (e) => {
    const { maintenanceCardAddActionCreators } = props;
    const { actSearchRepairman } = maintenanceCardAddActionCreators;
    actSearchRepairman(e.target.value, 1, 7);
    setRepairmanSearch(e.target.value);
  };

  const submitForm = (values) => {
    const { maintenanceCardAddActionCreators } = props;
    if (id === 0) {
      const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
      actCreateMaintenanceCard(values, true);
    } else {
      const { actUpdateMaintenanceCard } = maintenanceCardAddActionCreators;
      actUpdateMaintenanceCard(values);
    }
  };

  const submitFailedForm = (values) => {
    const { maintenanceCardAddActionCreators } = props;
    const { actCreateMaintenanceCard } = maintenanceCardAddActionCreators;
    actCreateMaintenanceCard(values, false);
  };

  const handScrollAutoComplete = (e) => {
    const isEndOfList = e.target.scrollTop + e.target.clientHeight;
    if (isEndOfList > e.target.scrollHeight - 50) {
      if (totalRepairman > repairmanPage * 7) {
        const { maintenanceCardAddActionCreators } = props;
        const { actUpdateListRepairman } = maintenanceCardAddActionCreators;
        if (repairmanSearch === undefined) {
          actUpdateListRepairman("");
        } else actUpdateListRepairman(repairmanSearch);
      }
    }
  };
  function disabledDateTime() {
    let now = new Date();

    return {
      disabledHours: () => range(0, 24).splice(0, now.getHours()),
    };
  }
  const renderFields = () => {
    return [
      {
        name: "txtRepairman",
        value: repairmanSearch,
      },
      {
        name: "txtCoordinator",
        value: props.user.fullName,
      },
      {
        name: "txtCode",
        value:
          info.code !== undefined && info.code !== null
            ? info.code.toUpperCase()
            : "",
      },
      {
        name: "txtPlatesNumber",
        value: info.platesNumber,
      },
      {
        name: "txtColor",
        value: info.color,
      },
      {
        name: "txtModel",
        value: info.model,
      },
      {
        name: "txtReturnDate",
        value:
          info.returnDate === "" || info.returnDate === null
            ? ""
            : moment(info.returnDate),
      },
      {
        name: "txtExpectedReturnDate",
        value:
          info.expectedReturnDate === "" || info.expectedReturnDate === null
            ? ""
            : moment(info.expectedReturnDate),
      },
      {
        name: "txtDescription",
        value: info.description,
      },
      {
        name: "txtCoordinator",
        value: coordinator.fullName,
      },
    ];
  };

  const changeInput = (e, check) => {
    console.log(e);
    let target = e.target;
    if (target !== null && target !== undefined) {
      let a = { ...info };
      a[target.name] = target.value;
      console.log(a);
      setInfo(a);
    } else {
      console.log(check);
      if (check === "return_date") {
        let a = { ...info };
        a["returnDate"] = e._d;
        console.log(a);
        setInfo(a);
      } else {
        let a = { ...info };
        a["expectedReturnDate"] = e._d;
        console.log(a);
        setInfo(a);
      }
    }
  };

  const handleSelectColor = (e) => {
    let a = { ...info };
    a["color"] = e;
    console.log(a);
    setInfo(a);
  };

  const handleSelectModel = (e) => {
    let a = { ...info };
    a["model"] = e;
    console.log(a);
    setInfo(a);
  };

  const handleSelectPlates = (e) => {
    let a = { ...info };
    a["platesNumber"] = e;
    for (let i = 0; i < plateNumbers.length; i++) {
      const item = plateNumbers[i];
      if (item.plateNumber === e) {
        a["model"] = item.model;
        a["color"] = item.color;
      }
    }
    setInfo(a);
  };

  const focusPlateNumberInput = () => {
    const { maintenanceCardAddActionCreators } = props;
    const { actGetPlateNumberByCustomer } = maintenanceCardAddActionCreators;
    actGetPlateNumberByCustomer();
  };

  return (
    <Row>
      <Form
        ref={formRef}
        {...layout}
        name="maintenanceCardInfo"
        style={{ width: "100%" }}
        onFinish={submitForm}
        fields={renderFields()}
        initialValues={renderFields()}
        onFinishFailed={submitFailedForm}
      >
        <Form.Item label="Mã" name="txtCode" labelAlign="left">
          {user.role === 2 ||
          user.role === 0 ||
          props.maintenanceCardAdd.info.returnDate != null ? (
            <span>
              {info.code !== undefined && info.code !== null
                ? info.code.toUpperCase()
                : ""}
            </span>
          ) : (
            <Input onChange={changeInput} name="code" />
          )}
        </Form.Item>
        <Form.Item
          label="Biển số xe"
          name="txtPlatesNumber"
          rules={[
            { required: true, message: "Vui lòng nhập biển số xe!" },
            {
              pattern: "[0-9]{2}[a-zA-Z]{1}[0-9]{5,6}",
              max: 9,
              message: "Vui lòng nhập đúng định dạng biển số xe!",
            },
          ]}
          labelAlign="left"
          validateTrigger={["onBlur"]}
        >
          {id ? (
            <span>
              {info.platesNumber !== null
                ? formatPlate(info.platesNumber)
                : "--"}
            </span>
          ) : (
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              style={{ width: "100%" }}
              options={renderPlatesOptions()}
              onFocus={focusPlateNumberInput}
              onSelect={handleSelectPlates}
            >
              <Input onChange={changeInput} name="platesNumber" />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          label="Nhân viên sửa chữa:"
          name="txtRepairman"
          labelAlign="left"
        >
          {edit &&
          user.role !== 2 &&
          user.role !== 0 &&
          props.maintenanceCardAdd.info.returnDate === null ? (
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              style={{ width: "100%" }}
              options={renderRepairmanOptions()}
              // allowClear={true}
              onSelect={selectRepairmanItem}
              onFocus={focusRepairmanInput}
              value={repairmanSearch}
              onPopupScroll={handScrollAutoComplete}
            >
              <Input size="middle" onChange={handleChangeRepairmanSearch} />
            </AutoComplete>
          ) : user.role === 3 ? (
            <span
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `/admin/employees/${props.maintenanceCardAdd.repairman.id}`,
                  "_blank"
                )
              }
            >
              {repairmanSearch !== null &&
              repairmanSearch !== "" &&
              repairmanSearch !== undefined
                ? repairmanSearch
                : "--"}
            </span>
          ) : (
            <span>
              {repairmanSearch !== null &&
              repairmanSearch !== "" &&
              repairmanSearch !== undefined
                ? repairmanSearch
                : "--"}
            </span>
          )}
        </Form.Item>

        <Form.Item
          label="Màu xe:"
          name="txtColor"
          labelAlign="left"
          rules={[
            {
              max: 50,
              message: "Chỉ được nhập tối đa 50 kí tự!",
            },
          ]}
          validateTrigger={["onBlur"]}
        >
          {user.role === 2 ||
          user.role === 0 ||
          props.maintenanceCardAdd.info.returnDate != null ? (
            <span>{info.color !== null ? info.color : "--"}</span>
          ) : (
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              options={colors}
              onSelect={handleSelectColor}
            >
              <Input size="middle" onChange={changeInput} name="color" />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          label="Loại xe:"
          name="txtModel"
          labelAlign="left"
          rules={[
            {
              max: 50,
              message: "Chỉ được nhập tối đa 50 kí tự!",
            },
          ]}
          validateTrigger={["onBlur"]}
        >
          {user.role === 2 ||
          user.role === 0 ||
          props.maintenanceCardAdd.info.returnDate != null ? (
            <span>{info.model !== null ? info.model : "--"}</span>
          ) : (
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              options={models}
              onSelect={handleSelectModel}
            >
              <Input size="middle" onChange={changeInput} name="model" />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          label="Nhân viên điều phối:"
          name="txtCoordinator"
          labelAlign="left"
        >
          {user.role === 3 ? (
            <span
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() =>
                window.open(`/admin/employees/${coordinator.id}`, "_blank")
              }
            >
              {coordinator.fullName}
            </span>
          ) : (
            <span>{coordinator.fullName}</span>
          )}
        </Form.Item>
          <Form.Item
            label="Ngày trả xe:"
            name="txtReturnDate"
            labelAlign="left"
          >
            {user.role === 2 ||
            user.role === 0 ||
            info.returnDate !== null ||
            !(
              props.maintenanceCardAdd.workStatus === 2 &&
              props.maintenanceCardAdd.payStatus === 1
            ) ? (
              <span>
                {info.returnDate === null ? "--" : formatDate(info.returnDate)}
              </span>
            ) : props.maintenanceCardAdd.info.returnDate === null ? (
              <DatePicker
                allowClear={false}
                disabledDate={(d) => !d || d.isBefore(moment())}
                disabledTime={disabledDateTime}
                showTime={{ hideDisabledOptions: true }}
                format="HH:mm DD/MM/yyyy"
                placeholder=""
                onChange={(e) => changeInput(e, "return_date")}
                name="returnDate"
                locale={{ ...locale, lang: { ...locale.lang, ok: "Chọn" } }}
              />
            ) : (
              <span>
                {info.returnDate === null ? "--" : formatDate(info.returnDate)}
              </span>
            )}
          </Form.Item>
     
        <Form.Item
            label="Ngày dự kiến trả xe:"
            name="txtExpectedReturnDate"
            labelAlign="left"
          >
            {user.role === 2 ||
            user.role === 0 ||
            props.maintenanceCardAdd.info.returnDate ? (
              <span>
                {info.expectedReturnDate !== null
                  ? formatDate(info.expectedReturnDate)
                  : "--"}
              </span>
            ) : (
              <DatePicker
                allowClear={false}
                disabledDate={(d) => !d || d.isBefore(moment())}
                disabledTime={disabledDateTime}
                showTime={{ hideDisabledOptions: true }}
                format="HH:mm DD/MM/yyyy"
                placeholder=""
                onChange={(e) => changeInput(e, "expected_return_date")}
                name="expectedReturnDate"
                locale={{ ...locale, lang: { ...locale.lang, ok: "Chọn" } }}
              />
            )}
          </Form.Item>
        <Form.Item label="Mô tả:" name="txtDescription" labelAlign="left">
          {user.role === 2 ||
          user.role === 0 ||
          props.maintenanceCardAdd.info.returnDate ? (
            <span>{info.description !== null ? info.description : "--"}</span>
          ) : (
            <Input.TextArea onChange={changeInput} name="description" />
          )}
        </Form.Item>
      </Form>
    </Row>
  );
};

export default MaintenanceCardInfo;
